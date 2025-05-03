# 📘 Account Guardian: Bulk Account Validation System

## Overview
Account Guardian is a validation platform designed to pre-verify account details in bulk transactions and prevent AC-01 errors (invalid/non-existent accounts). Built for high-volume financial environments like Pesalink, it filters and flags problematic accounts before payment processing begins.

## 🔧 Features
- Bulk file ingestion (CSV/JSON)
- Mock or live account validation API integration
- Real-time filtering of invalid accounts
- Structured validation reason codes (e.g., Format Error, Does Not Exist, Inactive)
- High throughput with concurrency support
- Secure data handling
- Clear report generation

## 📂 File Format Requirements

### Input Format
Upload files in CSV or JSON format with the following fields:

| Field | Description | Example |
|-------|-------------|---------|
| account_number | Target account to be validated | 1234567890 |
| bank_code | Identifying code of the target bank | 01 |
| amount | Transaction amount | 1000.00 |
| reference_id | Unique reference for the transaction | TXN1001 |

### Example (CSV)
```csv
account_number,bank_code,amount,reference_id
1234567890,01,1000.00,TXN1001
0987654321,02,500.00,TXN1002
```

### Example (JSON)
```json
[
  {
    "account_number": "1234567890",
    "bank_code": "01",
    "amount": "1000.00",
    "reference_id": "TXN1001"
  }
]
```

## 🚀 How It Works

### 1. Data Ingestion
Use the upload interface or CLI tool to ingest your structured transaction file.

### 2. Account Validation
Each account is checked using either:
- MockBankAPI (simulation)
- Real Bank API (if configured)
Status and validation reason are logged per entry.

### 3. Result Output
- `valid_accounts.csv` — All valid entries ready for processing
- `invalid_accounts.csv` — Entries flagged with reason codes
- `summary_report.txt` — Aggregated stats (e.g., total processed, invalid count)

## 🔒 Security Measures
- Sensitive fields (e.g., account numbers) are masked or encrypted in logs
- Data is encrypted in transit and at rest
- No plaintext logs of account data

## 🧪 Testing & Performance

### Run Test Scenarios
```bash
python validate.py --input data/sample_input.csv
```

### Simulate Large Batch
```bash
python generate_mock_data.py --rows 10000 --output data/mock_bulk.csv
```

### Output
- `/output/valid_accounts.csv`
- `/output/invalid_accounts.csv`
- `/output/summary_report.txt`

## 🛠️ API

### Endpoint: `/api/validate`
**Method:** POST

**Payload:**
```json
{
  "account_number": "1234567890",
  "bank_code": "01"
}
```

**Response:**
```json
{
  "status": "invalid",
  "reason": "Account Does Not Exist"
}
```

## 📦 Deployment

### Local Setup
```bash
git clone https://github.com/your-org/account-guardian.git
cd account-guardian
pip install -r requirements.txt
python app.py
```

### Docker (Optional)
```bash
docker build -t account-guardian .
docker run -p 5000:5000 account-guardian
```

## 📈 Reporting Format

### Sample Output:
```csv
account_number,bank_code,status,reason
1234567890,01,valid,
0987654321,02,invalid,Does Not Exist
```

### Summary Report:
```yaml
Total Records: 1000
Valid: 950
Invalid: 50
Reasons:
- Format Error: 10
- Does Not Exist: 30
- Inactive: 10
```

## 📑 Contribution & Maintenance
- Modular codebase (validation, I/O, API integration)
- Easily extendable for new validation rules or bank integrations
- Logs and errors handled via structured logging module

## 📞 Support & Questions
For bugs, issues, or enhancements, open an issue on [GitHub](https://github.com/pres264). 