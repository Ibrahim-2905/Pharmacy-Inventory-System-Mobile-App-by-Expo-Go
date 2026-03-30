<div align="center">

<img src="https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" />
<img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" />
<img src="https://img.shields.io/badge/Google%20Drive-4285F4?style=for-the-badge&logo=googledrive&logoColor=white" />
<img src="https://img.shields.io/badge/Offline%20First-34A853?style=for-the-badge&logo=checkmarx&logoColor=white" />

# 💊 Pharmacy Inventory Manager

**A fully offline mobile app for local pharmacy & shop owners — no internet required.**

Built with React Native + Expo Go | SQLite local database | Google Drive backup

</div>

---

## 📖 About

**Pharmacy Inventory Manager** is a mobile application built for small local shop and pharmacy owners who face challenges with internet connectivity. The app runs **100% offline** — all data is stored locally on the device using SQLite. Owners can manage their medicines, track sales, apply discounts, and view profit/loss reports without ever needing a Wi-Fi connection.

When a backup is needed, a simple Google Sign-In allows automatic backup to Google Drive — and restoration is just as easy by importing the backup file.

> Built for the real world — where internet is a luxury, not a guarantee.

---

## ✨ Features

### 💊 Medicine Management
- Add medicines with:
  - Medicine name
  - Purchase price (per single tablet)
  - Sell price (per single tablet)
  - Quantity / stock
- Edit or delete existing medicine records
- View full inventory list at a glance

### 🛒 Sales & Billing
- Sell medicines by quantity
- Apply **discount (%)** on individual sales
- Automatic profit/loss calculation per sale
- Stock is automatically deducted on every sale

### 📊 Reports
- **Today's Report** — sales, revenue, profit/loss for the current day
- **Monthly Report** — full month summary with breakdowns
- Download/export reports as files
- Profit & loss calculation **per day** and **per month**

### ☁️ Backup & Restore
- **Google Drive Backup** — sign in once with Google, then backup is automated
- **Restore from file** — import your `.db` backup file anytime, no internet needed during restore
- Works completely offline after initial Google sign-in

### 📴 Fully Offline
- Zero internet dependency for core functionality
- All data lives on your phone (SQLite)
- Perfect for areas with no or unstable internet

---

## 📱 Screenshots

> *(Add your app screenshots here)*

| Inventory | Add Medicine | Sales | Reports |
|-----------|-------------|-------|---------|
| ![inv](#) | ![add](#)   | ![sale](#) | ![rep](#) |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React Native](https://reactnative.dev/) | Mobile app framework |
| [Expo Go](https://expo.dev/) | Development & distribution |
| [SQLite (expo-sqlite)](https://docs.expo.dev/versions/latest/sdk/sqlite/) | Local offline database |
| [Google Drive API](https://developers.google.com/drive) | Cloud backup |
| [expo-auth-session](https://docs.expo.dev/versions/latest/sdk/auth-session/) | Google Sign-In |
| [expo-file-system](https://docs.expo.dev/versions/latest/sdk/filesystem/) | File backup & restore |
| [expo-sharing](https://docs.expo.dev/versions/latest/sdk/sharing/) | Export/share reports |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or above)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- Expo Go app on your Android or iOS device

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/pharmacy-inventory-manager.git

# Navigate to the project folder
cd pharmacy-inventory-manager

# Install dependencies
npm install

# Start the Expo development server
npx expo start
```

Scan the QR code with **Expo Go** on your phone to run the app.

---

## 🗄️ Database Structure (SQLite)

### `medicines` table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| name | TEXT | Medicine name |
| purchase_price | REAL | Cost per tablet |
| sell_price | REAL | Selling price per tablet |
| quantity | INTEGER | Current stock |
| created_at | TEXT | Date added |

### `sales` table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | Primary key |
| medicine_id | INTEGER | Foreign key → medicines |
| quantity_sold | INTEGER | Units sold |
| discount_percent | REAL | Discount applied (%) |
| total_amount | REAL | Final sale amount |
| profit | REAL | Profit on this sale |
| sale_date | TEXT | Date of sale |

---

## ☁️ Backup & Restore Guide

### Backup to Google Drive
1. Go to **Settings** in the app
2. Tap **Sign in with Google**
3. Once signed in, tap **Backup Now** — or enable **Auto Backup**
4. Your database file is saved to your Google Drive

### Restore from File
1. Locate your `.db` backup file (from Drive, WhatsApp, email, etc.)
2. Go to **Settings → Restore**
3. Select the backup file
4. App restores all data instantly — **no internet needed**

---

## 📈 Reports Overview

| Report | Details |
|--------|---------|
| Today's Sales | All sales made today, total revenue |
| Monthly Sales | Full month breakdown by day |
| Profit/Loss (Daily) | Net profit or loss for the day |
| Profit/Loss (Monthly) | Net profit or loss for the month |
| Export | Download report as file (share via WhatsApp, email, etc.) |

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Built with ❤️ for local shop owners who deserve great tools — internet or not.

> *"Technology should work for everyone, not just those with a fast connection."*

---

<div align="center">
  <sub>Made with React Native + Expo | Offline First | Built for Pakistan's local shops</sub>
</div>
