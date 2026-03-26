# 🔐 Adding Authentication & Database to FitTrack

## Complete Step-by-Step Guide

This guide will help you add:
1. **Supabase Authentication** - User login/signup
2. **Google Sheets as Database** - Store all workout data

---

## 📋 What We'll Change

### Current State (LocalStorage):
```javascript
// Line 94-100 in script.js
saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

loadFromStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
```

### New State (Google Sheets + Supabase):
- ✅ Users must login to use the app
- ✅ All data saved to Google Sheets (one row per workout)
- ✅ Data syncs across devices
- ✅ Each user has their own data

---

## 🎯 PART 1: Setup (Do This First)

### Step 1: Create Supabase Account

1. Go to **https://supabase.com**
2. Click **"Start your project"**
3. Sign up with GitHub or Email
4. Create a new project:
   - **Name:** FitTrack
   - **Database Password:** (save this!)
   - **Region:** Choose closest to you
   - Click **"Create new project"**
5. Wait 2-3 minutes for setup

### Step 2: Get Supabase Credentials

Once your project is ready:

1. Go to **Settings** (gear icon) → **API**
2. Copy these TWO values:
   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
3. **Save these somewhere safe!**

### Step 3: Enable Email Auth in Supabase

1. Go to **Authentication** → **Providers**
2. Find **Email**
3. Make sure it's **Enabled** (toggle should be green)
4. Scroll down → **Enable email confirmations** → **OFF** (for testing)
5. Click **Save**

### Step 4: Create Google Sheet

1. Go to **https://sheets.google.com**
2. Create a **new blank spreadsheet**
3. Name it: **FitTrack Database**
4. Create these columns in Row 1:
   ```
   A1: user_email
   B1: workout_id
   C1: category
   D1: exercise_name
   E1: duration
   F1: intensity
   G1: calories
   H1: date
   I1: created_at
   ```

### Step 5: Make Google Sheet Public (API Access)

1. Click **Share** button (top right)
2. Click **"Anyone with the link"**
3. Change to **"Anyone on the internet with this link can edit"**
4. Click **Done**
5. Copy the **Sheet ID** from URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
                                           ^^^^^^^^^^^^^^
   ```
6. **Save this Sheet ID!**

### Step 6: Enable Google Sheets API

1. Go to **https://console.cloud.google.com**
2. Create a new project: **FitTrack**
3. Go to **APIs & Services** → **Library**
4. Search: **Google Sheets API**
5. Click **Enable**
6. Go to **Credentials** → **Create Credentials** → **API Key**
7. Copy the API Key
8. **Save this API Key!**

---

## 🚀 PART 2: Code Changes

### Files You'll Modify:
1. `index.html` - Add login page
2. `script.js` - Add auth + sheets integration
3. `style.css` - Add login styling

---

## 📄 STEP-BY-STEP CODE CHANGES

### Change 1: Update HTML (Add Login Page)

**Location:** `index.html` - Add BEFORE `<nav class="navbar">`

```html
<!-- Login/Signup Page -->
<div id="auth-container" class="auth-container">
    <div class="auth-card">
        <h1 class="auth-title">💪 FitTrack</h1>
        <p class="auth-subtitle">Your Personal Fitness Companion</p>
        
        <div id="loginForm" class="auth-form">
            <h2>Login</h2>
            <input type="email" id="loginEmail" placeholder="Email" required>
            <input type="password" id="loginPassword" placeholder="Password" required>
            <button onclick="handleLogin()" class="btn btn-primary btn-large">Login</button>
            <p class="auth-switch">Don't have an account? <a href="#" onclick="showSignup()">Sign Up</a></p>
        </div>

        <div id="signupForm" class="auth-form" style="display: none;">
            <h2>Sign Up</h2>
            <input type="email" id="signupEmail" placeholder="Email" required>
            <input type="password" id="signupPassword" placeholder="Password (min 6 characters)" required>
            <button onclick="handleSignup()" class="btn btn-primary btn-large">Sign Up</button>
            <p class="auth-switch">Already have an account? <a href="#" onclick="showLogin()">Login</a></p>
        </div>
    </div>
</div>
```

**Location:** `index.html` - Add in navbar (after logo, before nav-menu)

```html
<div class="nav-user">
    <span id="userEmailDisplay"></span>
    <button class="btn-logout" onclick="handleLogout()">Logout</button>
</div>
```

**Location:** `index.html` - Add BEFORE closing `</body>` tag

```html
<!-- Supabase SDK -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
```

---

### Change 2: Add CSS for Login Page

**Location:** `style.css` - Add at the END of file

```css
/* ===================================
   Authentication Pages
   =================================== */

.auth-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.auth-container.hidden {
    display: none;
}

.auth-card {
    background: var(--bg-card);
    padding: var(--spacing-xl);
    border-radius: var(--radius-lg);
    border: 2px solid var(--border);
    width: 100%;
    max-width: 450px;
    box-shadow: var(--shadow-lg);
}

.auth-title {
    font-size: 3rem;
    font-weight: 800;
    text-align: center;
    margin-bottom: var(--spacing-sm);
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.auth-subtitle {
    text-align: center;
    color: var(--text-secondary);
    margin-bottom: var(--spacing-xl);
}

.auth-form h2 {
    font-size: 1.8rem;
    margin-bottom: var(--spacing-md);
    color: var(--text-primary);
}

.auth-form input {
    width: 100%;
    background: var(--bg-secondary);
    border: 2px solid var(--border);
    color: var(--text-primary);
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
    font-family: var(--font-primary);
    font-size: 1rem;
    margin-bottom: var(--spacing-md);
}

.auth-form input:focus {
    outline: none;
    border-color: var(--primary);
}

.auth-switch {
    text-align: center;
    margin-top: var(--spacing-md);
    color: var(--text-secondary);
}

.auth-switch a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
}

.nav-user {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-left: auto;
    margin-right: var(--spacing-md);
}

.nav-user span {
    color: var(--text-secondary);
}

.btn-logout {
    background: var(--danger);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: var(--radius-md);
    cursor: pointer;
    font-family: var(--font-primary);
    font-weight: 600;
}

.btn-logout:hover {
    background: #D63955;
}
```

---

### Change 3: Replace JavaScript Completely

**Location:** Create NEW FILE `config.js` in same folder as index.html

```javascript
// ===================================
// Configuration
// ===================================

const CONFIG = {
    // Supabase Configuration
    SUPABASE_URL: 'YOUR_SUPABASE_URL_HERE',  // From Step 2
    SUPABASE_KEY: 'YOUR_SUPABASE_ANON_KEY_HERE',  // From Step 2
    
    // Google Sheets Configuration
    SHEET_ID: 'YOUR_GOOGLE_SHEET_ID_HERE',  // From Step 5
    GOOGLE_API_KEY: 'YOUR_GOOGLE_API_KEY_HERE'  // From Step 6
};

// DO NOT COMMIT THIS FILE TO GITHUB IF PUBLIC!
```

**Location:** `index.html` - Add AFTER Supabase script, BEFORE your script.js

```html
<script src="config.js"></script>
```

---

### Change 4: Update script.js

**Location:** `script.js` - Add at the VERY TOP (line 1)

```javascript
// ===================================
// Supabase & Google Sheets Setup
// ===================================

let supabase;
let currentUser = null;

// Initialize Supabase
function initSupabase() {
    const { createClient } = window.supabase;
    supabase = createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);
    checkUser();
}

// Check if user is logged in
async function checkUser() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
        currentUser = session.user;
        showApp();
        document.getElementById('userEmailDisplay').textContent = currentUser.email;
    } else {
        showAuth();
    }
}

// Show/Hide Auth vs App
function showAuth() {
    document.getElementById('auth-container').classList.remove('hidden');
    document.querySelector('.navbar').style.display = 'none';
    document.querySelector('.container').style.display = 'none';
}

function showApp() {
    document.getElementById('auth-container').classList.add('hidden');
    document.querySelector('.navbar').style.display = 'flex';
    document.querySelector('.container').style.display = 'block';
}

// Authentication Functions
async function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    
    if (error) {
        alert('Login failed: ' + error.message);
    } else {
        currentUser = data.user;
        showApp();
        document.getElementById('userEmailDisplay').textContent = currentUser.email;
        app.loadUserData();
    }
}

async function handleSignup() {
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password
    });
    
    if (error) {
        alert('Signup failed: ' + error.message);
    } else {
        alert('Account created! Please login.');
        showLogin();
    }
}

async function handleLogout() {
    await supabase.auth.signOut();
    currentUser = null;
    showAuth();
}

function showLogin() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('signupForm').style.display = 'none';
}

function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

// Google Sheets Functions
async function saveWorkoutToSheet(workout) {
    const row = [
        currentUser.email,
        workout.id,
        workout.category,
        workout.name,
        workout.duration,
        workout.intensity,
        workout.calories,
        workout.date,
        workout.createdAt
    ];
    
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/Sheet1!A:I:append?valueInputOption=RAW&key=${CONFIG.GOOGLE_API_KEY}`;
    
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            values: [row]
        })
    });
    
    if (!response.ok) {
        console.error('Failed to save to Google Sheets');
    }
}

async function loadWorkoutsFromSheet() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/Sheet1!A:I?key=${CONFIG.GOOGLE_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!data.values) return [];
    
    // Skip header row, filter by current user
    const rows = data.values.slice(1);
    const userWorkouts = rows
        .filter(row => row[0] === currentUser.email)
        .map(row => ({
            id: parseInt(row[1]),
            category: row[2],
            name: row[3],
            duration: parseInt(row[4]),
            intensity: row[5],
            calories: parseInt(row[6]),
            date: row[7],
            createdAt: row[8]
        }));
    
    return userWorkouts;
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    initSupabase();
});
```

---

**Location:** `script.js` - FIND the `saveToStorage` function (around line 94) and REPLACE with:

```javascript
// Storage Methods - NOW USING GOOGLE SHEETS
async saveToStorage(key, data) {
    // For workouts, save to Google Sheets
    if (key === 'workouts') {
        // Individual workouts are saved when created
        // This is just for compatibility
        return;
    }
    // For goals and metrics, still use localStorage for now
    localStorage.setItem(key, JSON.stringify(data));
}

async loadFromStorage(key) {
    if (key === 'workouts') {
        // Load from Google Sheets
        return await loadWorkoutsFromSheet();
    }
    // For goals and metrics
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}
```

---

**Location:** `script.js` - FIND the `saveWorkout()` function and UPDATE to:

```javascript
async saveWorkout() {
    const category = document.getElementById('workoutCategory').value;
    const exerciseName = document.getElementById('exerciseName').value;
    const duration = parseInt(document.getElementById('duration').value);
    const intensity = document.getElementById('intensity').value;
    const date = document.getElementById('workoutDate').value;

    const calories = this.calculateCalories(category, exerciseName, duration, intensity);

    const workout = {
        id: Date.now(),
        category,
        name: exerciseName,
        duration,
        intensity,
        calories,
        date,
        createdAt: new Date().toISOString()
    };

    // Save to Google Sheets
    await saveWorkoutToSheet(workout);
    
    // Add to local array
    this.workouts.push(workout);
    
    // Reset form
    document.getElementById('workoutForm').reset();
    document.getElementById('exerciseSelectGroup').style.display = 'none';
    document.getElementById('calorieEstimate').style.display = 'none';
    this.setDefaultDate();

    this.showToast(`Workout logged! 🔥 ${calories} calories burned!`, 'success');
    this.updateDashboard();
    this.loadWorkoutHistory();
}
```

---

**Location:** `script.js` - FIND the constructor and UPDATE init():

```javascript
async init() {
    this.setupNavigation();
    this.setupForms();
    this.setupExerciseDropdown();
    await this.loadUserData();  // NEW: Load from sheets
    this.setDefaultDate();
}

// NEW FUNCTION: Add after init()
async loadUserData() {
    this.workouts = await loadWorkoutsFromSheet();
    this.goal = this.loadFromStorage('goal') || null;
    this.metrics = this.loadFromStorage('metrics') || null;
    this.updateDashboard();
    this.loadWorkoutHistory();
    this.loadGoalDisplay();
    this.loadMetrics();
}
```

---

## ✅ TESTING CHECKLIST

### Test 1: Authentication
- [ ] Open index.html
- [ ] See login page
- [ ] Click "Sign Up"
- [ ] Create account with email + password
- [ ] Get "Account created" message
- [ ] Login with credentials
- [ ] See dashboard

### Test 2: Workout Logging
- [ ] Log a workout
- [ ] Check Google Sheet - new row appears!
- [ ] Refresh page
- [ ] Data still there!

### Test 3: Multi-User
- [ ] Logout
- [ ] Create second account
- [ ] Login
- [ ] Should see EMPTY dashboard
- [ ] Login with first account
- [ ] Should see your workouts back

---

## 🐛 Common Issues & Fixes

### Issue 1: "Invalid API key" error
**Fix:** Double-check CONFIG.GOOGLE_API_KEY matches exactly

### Issue 2: Can't write to Google Sheets
**Fix:** Make sure sheet is "Anyone can edit" in sharing settings

### Issue 3: Supabase errors
**Fix:** Check SUPABASE_URL and SUPABASE_KEY are correct

### Issue 4: Login page won't hide
**Fix:** Add `.hidden { display: none; }` to CSS

---

## 📊 What Changed?

| Feature | Before (LocalStorage) | After (Sheets + Auth) |
|---------|----------------------|----------------------|
| Data Storage | Browser only | Google Sheets (cloud) |
| Multi-device | ❌ No | ✅ Yes |
| User accounts | ❌ No | ✅ Yes |
| Data security | Public on device | Private per user |
| Offline | ✅ Yes | ❌ Needs internet |

---

## 🎯 Summary

**3 Main Changes:**
1. **Login page** - Users must authenticate
2. **Supabase** - Handles user accounts
3. **Google Sheets** - Stores workout data in cloud

**Files Modified:**
- `index.html` - Added login UI
- `style.css` - Added login styles
- `script.js` - Added auth + sheets logic
- `config.js` - NEW file for credentials

---

## 🚀 Next Steps After This Works

1. **Add Goals to Sheets** - Store goals in Sheet2
2. **Add Metrics to Sheets** - Store metrics in Sheet3
3. **Better Error Handling** - Show better messages
4. **Loading States** - Show spinner while loading
5. **Offline Support** - Cache data when offline

---

Need help with any step? Let me know which part is confusing!
