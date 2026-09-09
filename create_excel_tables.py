import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

# Create workbook
wb = openpyxl.Workbook()

# Define Color Palette (Executive Navy & Blue Theme)
NAVY_FILL = PatternFill(start_color="1E3A8A", end_color="1E3A8A", fill_type="solid")
HEADER_FONT = Font(name="Calibri", size=11, bold=True, color="FFFFFF")
TITLE_FONT = Font(name="Calibri", size=14, bold=True, color="1E3A8A")
SUBTITLE_FONT = Font(name="Calibri", size=10, italic=True, color="475569")
CELL_FONT = Font(name="Calibri", size=11, color="0F172A")
BOLD_CELL_FONT = Font(name="Calibri", size=11, bold=True, color="0F172A")

THIN_BORDER = Border(
    left=Side(style='thin', color='CBD5E1'),
    right=Side(style='thin', color='CBD5E1'),
    top=Side(style='thin', color='CBD5E1'),
    bottom=Side(style='thin', color='CBD5E1')
)

ZEBRA_FILL = PatternFill(start_color="F8FAFC", end_color="F8FAFC", fill_type="solid")
WHITE_FILL = PatternFill(start_color="FFFFFF", end_color="FFFFFF", fill_type="solid")

def style_table(ws, title, subtitle, headers, data, start_row=1):
    # Title
    ws.cell(row=start_row, column=1, value=title).font = TITLE_FONT
    ws.cell(row=start_row+1, column=1, value=subtitle).font = SUBTITLE_FONT
    
    # Headers
    h_row = start_row + 3
    for col_idx, header in enumerate(headers, 1):
        cell = ws.cell(row=h_row, column=col_idx, value=header)
        cell.fill = NAVY_FILL
        cell.font = HEADER_FONT
        cell.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
        cell.border = THIN_BORDER
    ws.row_dimensions[h_row].height = 28
    
    # Data Rows
    current_row = h_row + 1
    for r_idx, row_data in enumerate(data):
        row_num = current_row + r_idx
        fill = ZEBRA_FILL if r_idx % 2 == 1 else WHITE_FILL
        for c_idx, val in enumerate(row_data, 1):
            cell = ws.cell(row=row_num, column=c_idx, value=val)
            cell.font = BOLD_CELL_FONT if c_idx == 1 else CELL_FONT
            cell.fill = fill
            cell.border = THIN_BORDER
            cell.alignment = Alignment(vertical="center", wrap_text=True)
        ws.row_dimensions[row_num].height = 22
        
    end_row = current_row + len(data)
    
    # Auto-adjust column widths
    for col in ws.columns:
        max_len = 0
        col_letter = get_column_letter(col[0].column)
        for cell in col:
            if cell.row >= h_row and cell.value:
                max_len = max(max_len, len(str(cell.value)))
        ws.column_dimensions[col_letter].width = min(max(max_len + 4, 14), 50)
        
    return end_row + 2

# Data Definitions

# Table 1.1: KPI Metrics
t1_title = "Table 1.1: Executive KPI Metrics & Performance Benchmarks"
t1_sub = "Quantitative summary of 6 core safety metrics, period-over-period deltas, and operational baselines."
t1_headers = ["Metric Name", "Current Value", "Delta vs. Prev. Period", "Baseline / Index", "Risk Status", "Strategic & Operational Significance"]
t1_data = [
    ["Total Accidents", "5,000", "+4.2% ▲", "24,582 total", "Moderate", "Macro volume tracking; alerts officers to overall network traffic velocity shifts."],
    ["Fatal Accidents", "1,158", "-8.1% ▼", "23.2% share", "Critical", "Primary life-safety metric; reduction demonstrates effectiveness of speed enforcement."],
    ["Serious Accidents", "1,854", "-2.4% ▼", "37.1% share", "High", "Measures severe occupant injuries requiring emergency trauma dispatch and hospital response."],
    ["Average Risk Score", "67 / 100", "-3.5% ▼", "Moderate-High", "Elevated", "Composite machine learning hazard index evaluating overall road network vulnerability."],
    ["High-Risk Locations", "37", "-5.1% ▼", "37 Zones", "Action Req.", "Identified dangerous corridor clusters requiring immediate engineering and patrol audits."],
    ["Model Accuracy", "87.4%", "Flat (0.0%)", "R Random Forest", "Optimal", "Predictive reliability score of the underlying machine learning severity engine."]
]

# Table 1.2: Filter Schema
t2_title = "Table 1.2: Multi-Dimensional Cross-Filtering Control Schema"
t2_sub = "Configuration breakdown of the global filter bar dimensions, options, and downstream impacts."
t2_headers = ["Filter Dimension", "Supported Dropdown Options", "Default Selection", "Filtering Scope", "Downstream Widget Impact"]
t2_data = [
    ["Severity Level", "All Severities, Fatal, Serious, Minor", "All Severities", "Global Dataset", "Updates KPI cards, Trend line chart, and Hourly distribution."],
    ["Geographic Region", "All Regions, North, South, East, West, Central", "All Regions", "Spatial Corridor", "Filters accident counts to specific regional jurisdictions."],
    ["Road Type", "All Types, Expressways, Arterial, Local, Highways", "All Road Types", "Infrastructure", "Isolates high-speed corridor risk vs. local urban road risk."],
    ["Weather Condition", "All Weather, Clear, Rain, Fog, Snow/Ice", "All Weather", "Atmospheric", "Adjusts severity donuts and environmental risk matrices."],
    ["Area Type", "All Areas, Urban, Rural", "All Areas", "Demographics", "Distinguishes high-density urban collisions from high-speed rural crashes."]
]

# Table 1.3: Monthly Progression
t3_title = "Table 1.3: Monthly Accident Volume & Severity Breakdown (Jan–Dec)"
t3_sub = "12-month crash data demonstrating mid-year dip (~Jun–Aug) and Q4 surge (~Oct–Dec)."
t3_headers = ["Month", "Total Crashes", "Minor (39.8%)", "Serious (37.1%)", "Fatal (23.2%)", "Seasonal Pattern & Analytical Observation"]
t3_data = [
    ["January", 450, 179, 167, 104, "High Q1 volume due to post-holiday travel and winter mist."],
    ["February", 420, 167, 156, 97, "Moderate volume; steady commuter traffic."],
    ["March", 410, 163, 152, 95, "Normal baseline spring traffic pattern."],
    ["April", 390, 155, 145, 90, "Slight reduction in inter-city long-distance transit."],
    ["May", 370, 147, 137, 86, "Transition period into summer travel patterns."],
    ["June", 340, 135, 126, 79, "Mid-Year Dip: Lower freight transport velocity."],
    ["July", 330, 131, 123, 76, "Mid-Year Dip: Lowest crash volume month of annual cycle."],
    ["August", 360, 143, 134, 83, "Gradual rebound in commercial traffic."],
    ["September", 400, 159, 148, 93, "Early monsoon/autumn rain volume surge."],
    ["October", 480, 191, 178, 111, "Q4 Surge: Festival/holiday travel escalation."],
    ["November", 510, 203, 189, 118, "Q4 Surge: Heavy fog onset and reduced night visibility."],
    ["December", 540, 215, 200, 125, "Q4 Peak: Highest crash volume and fatality risk month."]
]

# Table 1.4: 24-Hour Crash Density
t4_title = "Table 1.4: 24-Hour Crash Density & Time-Window Risk Matrix"
t4_sub = "Hourly risk breakdown identifying morning rush, evening peak, and late-night fatality windows."
t4_headers = ["Time Window", "Density Level", "Fatality Share (%)", "Illumination / Environment State", "Primary Hazard Classification"]
t4_data = [
    ["07:00 – 09:00", "High", "14.2%", "Daylight / High Traffic Density", "Morning Commuter Rush (Minor/Serious rear-end collisions)."],
    ["10:00 – 16:00", "Moderate", "18.5%", "Full Daylight / Normal Flow", "Mid-day Commercial Transit & Pedestrian Interaction."],
    ["17:00 – 20:00", "Very High", "28.8%", "Dusk / Declining Light / Peak Congestion", "Evening Rush Hour (Driver fatigue + high volume)."],
    ["22:00 – 03:00", "Low-Moderate", "38.5% (Peak)", "Dark / Poor Artificial Lighting", "Late-Night Fatality Spike: Speeding & impaired driving."]
]

# Table 1.5: Technical Stack Matrix
t5_title = "Table 1.5: Module 1 Technical Stack & Software Component Matrix"
t5_sub = "Software architecture mapping React UI, AppContext, R Plumber REST API, and R ML Engine."
t5_headers = ["Component Layer", "Target File Path", "Tech Stack", "Key Technical Responsibility"]
t5_data = [
    ["Presentation Page", "src/pages/OverviewDashboard.tsx", "React 18 / TypeScript", "Orchestrates page layout, grid widgets, and async loading skeletons."],
    ["Metric UI Card", "src/components/common/KPICard.tsx", "React / Lucide Icons", "Displays metric values, icon backgrounds, and period trend badges."],
    ["Global State Sync", "src/context/AppContext.tsx", "React Context API", "Maintains active filter state across Region, Severity, Weather, and Road Type."],
    ["API Data Client", "src/services/analyticsService.ts", "TypeScript Async API", "Asynchronously fetches /api/overview data payloads from backend."],
    ["Backend & ML Engine", "backend_r/plumber.R", "R Plumber + Random Forest", "Serves REST API endpoints on port 8000 and scores crash severity."]
]

# Populate Sheet 1: Combined Master Sheet
ws_all = wb.active
ws_all.title = "All Module 1 Tables"
next_row = 1
next_row = style_table(ws_all, t1_title, t1_sub, t1_headers, t1_data, next_row)
next_row = style_table(ws_all, t2_title, t2_sub, t2_headers, t2_data, next_row)
next_row = style_table(ws_all, t3_title, t3_sub, t3_headers, t3_data, next_row)
next_row = style_table(ws_all, t4_title, t4_sub, t4_headers, t4_data, next_row)
next_row = style_table(ws_all, t5_title, t5_sub, t5_headers, t5_data, next_row)

# Populate Individual Sheets
ws1 = wb.create_sheet(title="Table 1.1 KPI Metrics")
style_table(ws1, t1_title, t1_sub, t1_headers, t1_data)

ws2 = wb.create_sheet(title="Table 1.2 Filter Schema")
style_table(ws2, t2_title, t2_sub, t2_headers, t2_data)

ws3 = wb.create_sheet(title="Table 1.3 Monthly Trends")
style_table(ws3, t3_title, t3_sub, t3_headers, t3_data)

ws4 = wb.create_sheet(title="Table 1.4 Hourly Density")
style_table(ws4, t4_title, t4_sub, t4_headers, t4_data)

ws5 = wb.create_sheet(title="Table 1.5 Tech Stack Matrix")
style_table(ws5, t5_title, t5_sub, t5_headers, t5_data)

# Save Workbook
output_path = "/Users/harigowtham/Downloads/R_Capstone/Module_1_Report_Tables.xlsx"
wb.save(output_path)
print("SUCCESS:", output_path)
