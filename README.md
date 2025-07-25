# AchieveIt - Task & Project Management App
By Mayank

## Overview

AchieveIt is a modern, intuitive task and project management application built with React Native and Expo. The app helps users organize their tasks and projects efficiently while providing a sleek, user-friendly interface with a beautiful dark theme design.

## Features

- **Task Management**: Create, update, and delete tasks with ease
- **Project Organization**: Group related tasks into projects for better organization
- **Progress Tracking**: Visual progress bars for both tasks and projects
- **Smart Notifications**: Get reminders about your tasks and projects
- **Modern UI**: Sleek dark theme with smooth animations and transitions
- **Offline Support**: Local storage functionality for seamless offline use

## Installation and Setup

### Prerequisites

- Node.js
- npm
- Expo Go app installed on your mobile device

### Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/mayank0304/AchieveIt.git
   cd AchieveIt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Running on your device:
   - Install Expo Go from your device's app store
   - If the server is in development mode, you will need to enter 's' in terminal to go into Expo Go mode.
   - Scan the QR code shown in the terminal with:
     - Expo Go app
   - The app will load on your device

## Technical Implementation

### Key Technologies

- React Native with Expo
- TailwindCSS (via NativeWind) for styling
- AsyncStorage for local data persistence
- Expo Notifications for task reminders
- TypeScript for type safety

### Architecture Highlights

1. **File Structure**:
   - `app/` - Contains all screens and navigation logic using Expo Router
   - `lib/` - Houses utility functions and notification setup
   - `type/` - Contains TypeScript interfaces for Tasks and Projects

2. **Routing and Navigation**:
   - Tab-based navigation using Expo Router's file-based routing
   - Dynamic routes for project details (`[id].tsx`)
   - Not-found screen handling

3. **State Management**:
   - Local state management using React's useState and useEffect
   - AsyncStorage for persistent data storage
   - Efficient state updates with optimistic UI updates

## Design Choices and Challenges

### UI/UX Decisions

1. **Dark Theme Design**:
   - Dark Onyx background (`#0F172A`) with lighter content areas (`#1E293B`)
   - Cyan accents (Tailwind: `cyan-500`) for interactive elements
   - Semi-transparent modals for better context

2. **Layout Optimization**:
   - Bottom tab bar with custom styling and positioning
   - Grid layout for projects view
   - List layout for tasks with custom checkboxes

### Technical Challenges

The main technical challenge in this project was implementing the notification system, as it was my first time working with Expo Notifications. Key aspects included:

1. **Notification Implementation**:
   - Learning to handle notification permissions properly
   - Understanding notification scheduling and triggers
   - Managing notification lifecycles (creation and cancellation)

The rest of the implementation was straightforward, leveraging my experience from previous large-scale React Native projects. The project's architecture, state management, and UI implementation were implemented using established patterns and best practices I've used before.
