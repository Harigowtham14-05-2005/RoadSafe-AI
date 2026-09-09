import Papa from 'papaparse';
import { AccidentRecord, GlobalFilterState } from '../types/accident';
import { generateSampleRecords } from './mockData';

export interface DatasetQualityReport {
  fileName: string;
  totalRows: number;
  totalColumns: number;
  missingValues: number;
  qualityScore: number; // 0 to 100
  columns: string[];
  severityCounts: { Minor: number; Serious: number; Fatal: number };
}

class DataService {
  private records: AccidentRecord[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    // Initialize with rich sample records
    const stored = localStorage.getItem('roadsafe_accident_records');
    if (stored) {
      try {
        this.records = JSON.parse(stored);
      } catch {
        this.records = generateSampleRecords();
      }
    } else {
      this.records = generateSampleRecords();
      this.saveToStorage();
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem('roadsafe_accident_records', JSON.stringify(this.records.slice(0, 1000)));
    } catch {
      // ignore storage quota errors
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.saveToStorage();
    this.listeners.forEach(l => l());
  }

  public getRecords(): AccidentRecord[] {
    return [...this.records];
  }

  public addRecord(record: AccidentRecord): void {
    this.records.unshift(record);
    this.notify();
  }

  public addBatchRecords(newRecords: AccidentRecord[]): void {
    this.records = [...newRecords, ...this.records];
    this.notify();
  }

  public resetToDefault(): void {
    this.records = generateSampleRecords();
    this.notify();
  }

  public filterRecords(filters: Partial<GlobalFilterState>): AccidentRecord[] {
    return this.records.filter(r => {
      if (filters.severity && filters.severity !== 'all' && r.severity !== filters.severity) {
        return false;
      }
      if (filters.weather && filters.weather !== 'all' && r.weather !== filters.weather) {
        return false;
      }
      if (filters.roadType && filters.roadType !== 'all' && r.road_type !== filters.roadType) {
        return false;
      }
      if (filters.urbanRural && filters.urbanRural !== 'all' && r.urban_rural !== filters.urbanRural) {
        return false;
      }
      if (filters.region && filters.region !== 'all' && !r.region.toLowerCase().includes(filters.region.toLowerCase())) {
        return false;
      }
      if (filters.searchQuery && filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matches = 
          r.accident_id.toLowerCase().includes(query) ||
          r.location_name.toLowerCase().includes(query) ||
          r.road_type.toLowerCase().includes(query) ||
          r.weather.toLowerCase().includes(query) ||
          r.vehicle_type.toLowerCase().includes(query);
        if (!matches) return false;
      }
      return true;
    });
  }

  public getQualityReport(fileName = 'sample_accidents.csv'): DatasetQualityReport {
    let missing = 0;
    const severityCounts = { Minor: 0, Serious: 0, Fatal: 0 };

    this.records.forEach(r => {
      if (!r.accident_id || !r.date || !r.severity) missing++;
      if (r.severity === 'Fatal') severityCounts.Fatal++;
      else if (r.severity === 'Serious') severityCounts.Serious++;
      else severityCounts.Minor++;
    });

    const totalRows = this.records.length;
    const completeness = totalRows > 0 ? Math.max(0, 100 - (missing / (totalRows * 10)) * 100) : 0;
    const qualityScore = Math.min(100, Math.round(completeness * 0.98));

    return {
      fileName,
      totalRows,
      totalColumns: 20,
      missingValues: missing,
      qualityScore,
      columns: [
        'accident_id', 'date', 'time', 'latitude', 'longitude', 'location_name',
        'region', 'weather', 'road_surface', 'light_condition', 'road_type',
        'junction_type', 'speed_limit', 'vehicle_type', 'number_of_vehicles',
        'number_of_casualties', 'urban_rural', 'driver_age', 'driver_gender', 'severity'
      ],
      severityCounts
    };
  }

  public parseAndImportCSV(file: File): Promise<DatasetQualityReport> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedRecords: AccidentRecord[] = [];
          let missingCount = 0;

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          results.data.forEach((row: any, idx: number) => {
            if (!row.severity && !row.speed_limit) return;
            
            const severity = (row.severity || 'Minor') as 'Minor' | 'Serious' | 'Fatal';
            if (!row.weather || !row.road_surface) missingCount++;

            parsedRecords.push({
              accident_id: String(row.accident_id || `IMP-${Date.now()}-${idx}`),
              date: String(row.date || new Date().toISOString().split('T')[0]),
              time: String(row.time || '12:00'),
              latitude: Number(row.latitude || 28.6139 + (Math.random() - 0.5) * 0.05),
              longitude: Number(row.longitude || 77.2090 + (Math.random() - 0.5) * 0.05),
              location_name: String(row.location_name || 'Imported Highway Sector'),
              region: String(row.region || 'Regional Sector'),
              weather: (row.weather || 'Clear') as any,
              road_surface: (row.road_surface || 'Dry') as any,
              light_condition: (row.light_condition || 'Daylight') as any,
              road_type: (row.road_type || 'Single carriageway') as any,
              junction_type: (row.junction_type || 'Not at junction') as any,
              speed_limit: Number(row.speed_limit || 60),
              vehicle_type: (row.vehicle_type || 'Car') as any,
              number_of_vehicles: Number(row.number_of_vehicles || 2),
              number_of_casualties: Number(row.number_of_casualties || 1),
              urban_rural: (row.urban_rural || 'Urban') as any,
              driver_age: Number(row.driver_age || 35),
              driver_gender: (row.driver_gender || 'Male') as any,
              risk_score: Number(row.risk_score || (severity === 'Fatal' ? 88 : severity === 'Serious' ? 68 : 35)),
              severity
            });
          });

          if (parsedRecords.length > 0) {
            this.records = [...parsedRecords, ...this.records];
            this.notify();
          }

          const report = this.getQualityReport(file.name);
          resolve(report);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

  public exportToCSV(): void {
    const csv = Papa.unparse(this.records);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `roadsafe_accidents_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export const dataService = new DataService();
