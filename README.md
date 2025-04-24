# Cook Book Application

A modern recipe management application built with Angular 17 that helps users discover, save, and manage their favorite recipes.

![Screenshot 2025-04-24 at 10 31 44 PM](https://github.com/user-attachments/assets/5c8ed96a-9a41-4aaa-b950-613f7729a545)


## Features

- **Recipe Discovery**: Browse and search through a collection of recipes
- **Advanced Filtering**: Filter recipes by:
  - Search terms
  - Difficulty level
  - Ingredients
- **User Features**:
  - Save favorite recipes
  - Personal profile management
  - Recipe detail viewing
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technologies Used

- Angular 17.3.5
- Bootstrap 5
- Bootstrap Icons
- TypeScript
- RxJS
- Angular Signals for State Management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cook-book.git
```
2. Install dependencies:
```bash
cd cook-book
npm install
```
3. Start the development server:
```bash
ng serve
```
4. Navigate to http://localhost:4200/ in your browser

## Usage

#### Browsing Recipes
- Visit the recipes page to view all available recipes
- Use the search bar to find specific recipes
- Filter recipes by difficulty or ingredients

#### Managing Favorites
- Click the heart icon to save/unsave recipes
- View all saved recipes in the Favorites section
- Remove recipes from favorites as needed

#### Profile Management
- Update your profile information
- View your saved recipes
- Manage your account settings

### Project Structure

src/
  app/
    components/
      about/          # About page component
      home/           # Landing page component
      recipe/         # Recipe-related components
      shared/         # Shared components
      user/          # User-related components
    interfaces/      # TypeScript interfaces
    services/       # Application services

### Development
Development server
Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

### Building the project
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.

### Running tests
Run ng test to execute the unit tests via Karma.

## Contributing
Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

## Author
Khushi Raval
