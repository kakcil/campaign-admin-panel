## Live Demo / Canlı Demo
🔗 **[kakcil.github.io/campaign-admin-panel/](https://kakcil.github.io/campaign-admin-panel/)**

The English explanation is below the Turkish one.

# Kampanya Yönetim Paneli [TR]

Modern ve kullanıcı dostu arayüze sahip, kampanya yönetim işlemlerini kolaylaştıran Angular tabanlı web uygulaması.

## Özellikler ve Tasarım

- **Kullanıcı Girişi & Responsive Tasarım**: Güvenli giriş ve mobil uyumlu arayüz
- **Kampanya Yönetimi**: Listeleme, oluşturma, düzenleme ve silme
- **Dinamik Puanlama**: Kampanya puanını arttırma/azaltma (0'ın altına düşmez)
- **Tema Renkleri**: CSS değişkenleri ile tutarlı renk paleti
- **Yerel Veri Depolama**: Tüm veriler localStorage'da saklanır

## Teknoloji Stack

- **Frontend**: Angular 19
- **Styling**: SCSS
- **State Management**: Local Storage
- **Responsive Design**: Web ve Mobil uyumlu tasarım

## Kurulum

```bash
# Repoyu klonla
git clone https://github.com/kakcil/campaign-admin-panel.git

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
ng serve
```

## Proje Yapısı

```
src/
├── app/
│   ├── guards/       # Yetkilendirme kontrolleri
│   ├── layout/       # Ana sayfa düzeni 
│   ├── pages/        # Sayfa bileşenleri
│   └── services/     # Servisler
├── assets/           # Statik dosyalar
└── styles.scss       # Global stiller
```

## Demo Hesap

- **Kullanıcı**: admin
- **Şifre**: 1234

---

# Campaign Admin Panel [EN]

Modern, user-friendly Angular-based web application for campaign management operations.

## Features and Design

- **User Login & Responsive Design**: Secure login and mobile-friendly interface
- **Campaign Management**: List, create, edit, and delete campaigns
- **Dynamic Scoring**: Increase/decrease campaign scores (never below 0)
- **Theme Colors**: Consistent color palette with CSS variables
- **Local Storage**: All data stored in localStorage

## Technology Stack

- **Frontend**: Angular 19
- **Styling**: SCSS
- **State Management**: Local Storage
- **Responsive Design**: Web & Mobile-compatible design

## Installation

```bash
# Clone the repository
git clone https://github.com/kakcil/campaign-admin-panel.git

# Install dependencies
npm install

# Start development server
ng serve
```

## Project Structure

```
src/
├── app/
│   ├── guards/       # Authorization controls
│   ├── layout/       # Main page layout
│   ├── pages/        # Page components
│   └── services/     # Services
├── assets/           # Static files
└── styles.scss       # Global styles
```

## Demo Account

- **Username**: admin
- **Password**: 1234
