// Centralized API Client & Engine Switcher for RoadSafe AI

const DEFAULT_R_API_BASE = 'http://127.0.0.1:8000';

function deepUnbox(obj: any): any {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) {
    return obj.map(deepUnbox);
  }
  if (typeof obj === 'object') {
    const result: any = {};
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      if (Array.isArray(val) && val.length === 1 && (typeof val[0] === 'string' || typeof val[0] === 'number' || typeof val[0] === 'boolean')) {
        result[key] = val[0];
      } else {
        result[key] = deepUnbox(val);
      }
    }
    return result;
  }
  return obj;
}

class ApiClient {
  private baseUrl: string;
  private isLiveServerAvailable: boolean | null = null;
  private lastHealthCheck: number = 0;

  constructor() {
    this.baseUrl = localStorage.getItem('roadsafe_r_api_url') || DEFAULT_R_API_BASE;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public setBaseUrl(url: string): void {
    this.baseUrl = url;
    localStorage.setItem('roadsafe_r_api_url', url);
    this.isLiveServerAvailable = null;
  }

  public async checkRServerHealth(): Promise<boolean> {
    const now = Date.now();
    // Cache health check for 10 seconds
    if (this.isLiveServerAvailable !== null && now - this.lastHealthCheck < 10000) {
      return this.isLiveServerAvailable;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${this.baseUrl}/api/health`, {
        signal: controller.signal,
        headers: { 'Accept': 'application/json' }
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        this.isLiveServerAvailable = true;
      } else {
        this.isLiveServerAvailable = false;
      }
    } catch {
      this.isLiveServerAvailable = false;
    }

    this.lastHealthCheck = now;
    return this.isLiveServerAvailable;
  }

  public async request<T>(endpoint: string, options: RequestInit = {}): Promise<{ data: T | null; isFromRServer: boolean }> {
    const isLive = await this.checkRServerHealth();

    if (isLive) {
      try {
        const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
        const res = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers
          }
        });

        if (res.ok) {
          const json = await res.json();
          const unboxed = deepUnbox(json);
          return { data: unboxed as T, isFromRServer: true };
        }
      } catch (err) {
        console.warn(`[RoadSafe API] R Server request failed for ${endpoint}, falling back to local engine:`, err);
      }
    }

    // Return null to allow services to use the embedded simulation engine
    return { data: null, isFromRServer: false };
  }
}

export const api = new ApiClient();
