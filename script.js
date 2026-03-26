// ===================================
// Exercise Database with Calorie Calculations
// ===================================

const exerciseDatabase = {
    cardio: [
        { name: 'Running', caloriesPerMinute: { light: 7, moderate: 10, vigorous: 13 } },
        { name: 'Jogging', caloriesPerMinute: { light: 5, moderate: 7, vigorous: 9 } },
        { name: 'Walking', caloriesPerMinute: { light: 3, moderate: 4, vigorous: 5 } },
        { name: 'Cycling', caloriesPerMinute: { light: 5, moderate: 8, vigorous: 12 } },
        { name: 'Swimming', caloriesPerMinute: { light: 6, moderate: 9, vigorous: 12 } },
        { name: 'Jump Rope', caloriesPerMinute: { light: 8, moderate: 11, vigorous: 15 } },
        { name: 'Rowing', caloriesPerMinute: { light: 6, moderate: 9, vigorous: 12 } },
        { name: 'Elliptical', caloriesPerMinute: { light: 5, moderate: 7, vigorous: 10 } },
        { name: 'Stair Climbing', caloriesPerMinute: { light: 6, moderate: 9, vigorous: 12 } },
        { name: 'Treadmill', caloriesPerMinute: { light: 5, moderate: 8, vigorous: 11 } },
        { name: 'Hiking', caloriesPerMinute: { light: 4, moderate: 6, vigorous: 9 } },
        { name: 'Cross-Country Skiing', caloriesPerMinute: { light: 7, moderate: 10, vigorous: 14 } }
    ],
    strength: [
        { name: 'Weight Lifting', caloriesPerMinute: { light: 3, moderate: 5, vigorous: 7 } },
        { name: 'Bodyweight Exercises', caloriesPerMinute: { light: 4, moderate: 6, vigorous: 8 } },
        { name: 'Push-ups', caloriesPerMinute: { light: 5, moderate: 7, vigorous: 9 } },
        { name: 'Pull-ups', caloriesPerMinute: { light: 6, moderate: 8, vigorous: 10 } },
        { name: 'Squats', caloriesPerMinute: { light: 5, moderate: 7, vigorous: 9 } },
        { name: 'Deadlifts', caloriesPerMinute: { light: 4, moderate: 6, vigorous: 8 } },
        { name: 'Bench Press', caloriesPerMinute: { light: 3, moderate: 5, vigorous: 7 } },
        { name: 'Lunges', caloriesPerMinute: { light: 4, moderate: 6, vigorous: 8 } },
        { name: 'Plank', caloriesPerMinute: { light: 3, moderate: 4, vigorous: 5 } },
        { name: 'Crunches', caloriesPerMinute: { light: 3, moderate: 5, vigorous: 7 } },
        { name: 'CrossFit', caloriesPerMinute: { light: 7, moderate: 10, vigorous: 13 } },
        { name: 'Circuit Training', caloriesPerMinute: { light: 6, moderate: 9, vigorous: 12 } }
    ],
    flexibility: [
        { name: 'Yoga', caloriesPerMinute: { light: 2, moderate: 3, vigorous: 5 } },
        { name: 'Pilates', caloriesPerMinute: { light: 3, moderate: 4, vigorous: 6 } },
        { name: 'Stretching', caloriesPerMinute: { light: 2, moderate: 3, vigorous: 4 } },
        { name: 'Tai Chi', caloriesPerMinute: { light: 2, moderate: 3, vigorous: 4 } },
        { name: 'Barre', caloriesPerMinute: { light: 3, moderate: 5, vigorous: 7 } },
        { name: 'Hot Yoga', caloriesPerMinute: { light: 3, moderate: 5, vigorous: 7 } },
        { name: 'Vinyasa Yoga', caloriesPerMinute: { light: 3, moderate: 5, vigorous: 7 } },
        { name: 'Hatha Yoga', caloriesPerMinute: { light: 2, moderate: 3, vigorous: 4 } }
    ],
    sports: [
        { name: 'Basketball', caloriesPerMinute: { light: 5, moderate: 8, vigorous: 11 } },
        { name: 'Soccer', caloriesPerMinute: { light: 6, moderate: 9, vigorous: 12 } },
        { name: 'Tennis', caloriesPerMinute: { light: 5, moderate: 7, vigorous: 10 } },
        { name: 'Badminton', caloriesPerMinute: { light: 4, moderate: 6, vigorous: 8 } },
        { name: 'Volleyball', caloriesPerMinute: { light: 3, moderate: 5, vigorous: 7 } },
        { name: 'Baseball', caloriesPerMinute: { light: 3, moderate: 5, vigorous: 7 } },
        { name: 'Cricket', caloriesPerMinute: { light: 3, moderate: 5, vigorous: 7 } },
        { name: 'Golf', caloriesPerMinute: { light: 3, moderate: 4, vigorous: 5 } },
        { name: 'Martial Arts', caloriesPerMinute: { light: 6, moderate: 9, vigorous: 12 } },
        { name: 'Boxing', caloriesPerMinute: { light: 7, moderate: 10, vigorous: 13 } },
        { name: 'Rock Climbing', caloriesPerMinute: { light: 6, moderate: 8, vigorous: 11 } },
        { name: 'Skateboarding', caloriesPerMinute: { light: 4, moderate: 6, vigorous: 8 } }
    ],
    dance: [
        { name: 'Zumba', caloriesPerMinute: { light: 5, moderate: 8, vigorous: 11 } },
        { name: 'Hip Hop Dance', caloriesPerMinute: { light: 4, moderate: 6, vigorous: 9 } },
        { name: 'Ballet', caloriesPerMinute: { light: 3, moderate: 5, vigorous: 7 } },
        { name: 'Salsa', caloriesPerMinute: { light: 3, moderate: 5, vigorous: 7 } },
        { name: 'Ballroom Dancing', caloriesPerMinute: { light: 3, moderate: 4, vigorous: 6 } },
        { name: 'Aerobic Dance', caloriesPerMinute: { light: 5, moderate: 7, vigorous: 10 } },
        { name: 'Jazz Dance', caloriesPerMinute: { light: 4, moderate: 6, vigorous: 8 } },
        { name: 'Contemporary Dance', caloriesPerMinute: { light: 4, moderate: 6, vigorous: 8 } }
    ]
};

// ===================================
// Data Management
// ===================================

class FitTrackApp {
    constructor() {
        this.workouts = this.loadFromStorage('workouts') || [];
        this.goal = this.loadFromStorage('goal') || null;
        this.metrics = this.loadFromStorage('metrics') || null;
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupForms();
        this.setupExerciseDropdown();
        this.updateDashboard();
        this.loadWorkoutHistory();
        this.loadGoalDisplay();
        this.loadMetrics();
        this.setDefaultDate();
    }

    // Storage Methods
    saveToStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    loadFromStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    // Navigation
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.getAttribute('data-page');
                this.navigateTo(page);
            });
        });
    }

    navigateTo(page) {
        // Update active page
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(page).classList.add('active');

        // Update active nav button
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Setup Forms
    setupForms() {
        // Goal Form
        document.getElementById('goalForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveGoal();
        });

        // Show/hide target weight based on goal type
        document.getElementById('goalType').addEventListener('change', (e) => {
            const targetWeightGroup = document.getElementById('targetWeightGroup');
            if (e.target.value === 'weight-loss' || e.target.value === 'muscle-gain') {
                targetWeightGroup.style.display = 'block';
                document.getElementById('targetWeight').required = true;
            } else {
                targetWeightGroup.style.display = 'none';
                document.getElementById('targetWeight').required = false;
            }
        });

        // Workout Form
        document.getElementById('workoutForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveWorkout();
        });

        // Metrics Form
        document.getElementById('metricsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveMetrics();
        });

        // Filter workout history
        document.getElementById('filterCategory').addEventListener('change', () => {
            this.loadWorkoutHistory();
        });
    }

    // Setup Exercise Dropdown
    setupExerciseDropdown() {
        const categorySelect = document.getElementById('workoutCategory');
        const exerciseSelect = document.getElementById('exerciseName');
        const exerciseGroup = document.getElementById('exerciseSelectGroup');
        const durationInput = document.getElementById('duration');
        const intensitySelect = document.getElementById('intensity');

        categorySelect.addEventListener('change', (e) => {
            const category = e.target.value;
            if (category) {
                exerciseGroup.style.display = 'block';
                this.populateExercises(category);
            } else {
                exerciseGroup.style.display = 'none';
            }
            this.updateCalorieEstimate();
        });

        exerciseSelect.addEventListener('change', () => this.updateCalorieEstimate());
        durationInput.addEventListener('input', () => this.updateCalorieEstimate());
        intensitySelect.addEventListener('change', () => this.updateCalorieEstimate());
    }

    populateExercises(category) {
        const exerciseSelect = document.getElementById('exerciseName');
        exerciseSelect.innerHTML = '<option value="">Choose exercise...</option>';

        const exercises = exerciseDatabase[category] || [];
        exercises.forEach(exercise => {
            const option = document.createElement('option');
            option.value = exercise.name;
            option.textContent = exercise.name;
            exerciseSelect.appendChild(option);
        });
    }

    updateCalorieEstimate() {
        const category = document.getElementById('workoutCategory').value;
        const exerciseName = document.getElementById('exerciseName').value;
        const duration = parseInt(document.getElementById('duration').value) || 0;
        const intensity = document.getElementById('intensity').value;

        const estimateDiv = document.getElementById('calorieEstimate');
        const estimateValue = document.getElementById('estimatedCalories');

        if (category && exerciseName && duration > 0) {
            const calories = this.calculateCalories(category, exerciseName, duration, intensity);
            estimateValue.textContent = `${calories} kcal`;
            estimateDiv.style.display = 'block';
        } else {
            estimateDiv.style.display = 'none';
        }
    }

    calculateCalories(category, exerciseName, duration, intensity) {
        const exercises = exerciseDatabase[category] || [];
        const exercise = exercises.find(e => e.name === exerciseName);
        
        if (exercise) {
            const caloriesPerMin = exercise.caloriesPerMinute[intensity] || 5;
            return Math.round(caloriesPerMin * duration);
        }
        
        return 0;
    }

    // Set default date to today
    setDefaultDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('workoutDate').value = today;
        document.getElementById('targetDate').min = today;
    }

    // Save Goal
    saveGoal() {
        const goalType = document.getElementById('goalType').value;
        const targetWeight = document.getElementById('targetWeight').value;
        const targetDate = document.getElementById('targetDate').value;
        const weeklyWorkouts = document.getElementById('weeklyWorkouts').value;
        const notes = document.getElementById('notes').value;

        const goal = {
            type: goalType,
            targetWeight: targetWeight || null,
            targetDate,
            weeklyWorkouts,
            notes,
            createdAt: new Date().toISOString()
        };

        this.goal = goal;
        this.saveToStorage('goal', goal);
        this.showToast('Goal saved successfully! 🎯', 'success');
        this.loadGoalDisplay();
        this.navigateTo('dashboard');
    }

    loadGoalDisplay() {
        const goalDisplay = document.getElementById('goalDisplay');
        
        if (!this.goal) {
            goalDisplay.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🎯</div>
                    <p>No goal set yet. Start by setting your fitness goal!</p>
                    <button class="btn btn-primary" onclick="app.navigateTo('goals')">Set Your Goal</button>
                </div>
            `;
            return;
        }

        const goalTypeNames = {
            'weight-loss': 'Weight Loss',
            'muscle-gain': 'Muscle Gain',
            'maintain': 'Maintain Weight',
            'endurance': 'Build Endurance',
            'flexibility': 'Improve Flexibility'
        };

        goalDisplay.innerHTML = `
            <div class="goal-content">
                <div class="goal-type">${goalTypeNames[this.goal.type]}</div>
                <div class="goal-details">
                    ${this.goal.targetWeight ? `
                        <div class="goal-detail">
                            <span>Target Weight:</span>
                            <strong>${this.goal.targetWeight} kg</strong>
                        </div>
                    ` : ''}
                    <div class="goal-detail">
                        <span>Target Date:</span>
                        <strong>${new Date(this.goal.targetDate).toLocaleDateString()}</strong>
                    </div>
                    <div class="goal-detail">
                        <span>Weekly Workouts:</span>
                        <strong>${this.goal.weeklyWorkouts} days</strong>
                    </div>
                    ${this.goal.notes ? `
                        <div class="goal-detail">
                            <span>Notes:</span>
                            <strong>${this.goal.notes}</strong>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Save Workout
    saveWorkout() {
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

        this.workouts.push(workout);
        this.saveToStorage('workouts', this.workouts);
        
        // Reset form
        document.getElementById('workoutForm').reset();
        document.getElementById('exerciseSelectGroup').style.display = 'none';
        document.getElementById('calorieEstimate').style.display = 'none';
        this.setDefaultDate();

        this.showToast(`Workout logged! 🔥 ${calories} calories burned!`, 'success');
        this.updateDashboard();
        this.loadWorkoutHistory();
    }

    // Update Dashboard
    updateDashboard() {
        // Calculate total stats
        const totalCalories = this.workouts.reduce((sum, w) => sum + w.calories, 0);
        const totalWorkouts = this.workouts.length;
        const totalDuration = this.workouts.reduce((sum, w) => sum + w.duration, 0);

        document.getElementById('totalCalories').textContent = totalCalories.toLocaleString();
        document.getElementById('totalWorkouts').textContent = totalWorkouts;
        document.getElementById('totalDuration').textContent = totalDuration;

        // Update BMI
        if (this.metrics) {
            const bmi = this.calculateBMI(this.metrics.weight, this.metrics.height);
            const category = this.getBMICategory(bmi);
            document.getElementById('currentBMI').textContent = bmi;
            document.getElementById('bmiCategory').textContent = category;
        }

        // Load recent workouts
        this.loadRecentWorkouts();
    }

    loadRecentWorkouts() {
        const recentList = document.getElementById('recentWorkoutsList');
        const recentWorkouts = this.workouts.slice(-5).reverse();

        if (recentWorkouts.length === 0) {
            recentList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🏋️</div>
                    <p>No workouts logged yet. Let's get started!</p>
                    <button class="btn btn-primary" onclick="app.navigateTo('workout')">Log Your First Workout</button>
                </div>
            `;
            return;
        }

        recentList.innerHTML = recentWorkouts.map(workout => `
            <div class="workout-item">
                <div class="workout-info">
                    <div class="workout-header">
                        <div class="workout-name">${workout.name}</div>
                        <span class="workout-category ${workout.category}">${workout.category}</span>
                    </div>
                    <div class="workout-details">
                        <div class="workout-detail">⏱️ ${workout.duration} min</div>
                        <div class="workout-detail">🔥 ${workout.calories} kcal</div>
                        <div class="workout-detail">📅 ${new Date(workout.date).toLocaleDateString()}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Load Workout History
    loadWorkoutHistory() {
        const historyList = document.getElementById('workoutHistory');
        const filterCategory = document.getElementById('filterCategory').value;

        let filteredWorkouts = [...this.workouts].reverse();
        
        if (filterCategory !== 'all') {
            filteredWorkouts = filteredWorkouts.filter(w => w.category === filterCategory);
        }

        if (filteredWorkouts.length === 0) {
            historyList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📝</div>
                    <p>No workout history yet. Start logging your workouts!</p>
                </div>
            `;
            return;
        }

        historyList.innerHTML = filteredWorkouts.map(workout => `
            <div class="workout-item">
                <div class="workout-info">
                    <div class="workout-header">
                        <div class="workout-name">${workout.name}</div>
                        <span class="workout-category ${workout.category}">${workout.category}</span>
                    </div>
                    <div class="workout-details">
                        <div class="workout-detail">⏱️ ${workout.duration} min</div>
                        <div class="workout-detail">🔥 ${workout.calories} kcal</div>
                        <div class="workout-detail">💪 ${workout.intensity}</div>
                        <div class="workout-detail">📅 ${new Date(workout.date).toLocaleDateString()}</div>
                    </div>
                </div>
                <div class="workout-actions">
                    <button class="btn-icon" onclick="app.deleteWorkout(${workout.id})" title="Delete">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    deleteWorkout(id) {
        if (confirm('Are you sure you want to delete this workout?')) {
            this.workouts = this.workouts.filter(w => w.id !== id);
            this.saveToStorage('workouts', this.workouts);
            this.showToast('Workout deleted', 'success');
            this.updateDashboard();
            this.loadWorkoutHistory();
        }
    }

    // Save Metrics
    saveMetrics() {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const age = parseInt(document.getElementById('age').value) || null;
        const gender = document.getElementById('gender').value;

        const metrics = {
            weight,
            height,
            age,
            gender,
            updatedAt: new Date().toISOString()
        };

        this.metrics = metrics;
        this.saveToStorage('metrics', metrics);
        this.displayBMI(weight, height);
        this.showToast('Metrics updated successfully! 📊', 'success');
        this.updateDashboard();
    }

    loadMetrics() {
        if (this.metrics) {
            document.getElementById('weight').value = this.metrics.weight;
            document.getElementById('height').value = this.metrics.height;
            if (this.metrics.age) document.getElementById('age').value = this.metrics.age;
            document.getElementById('gender').value = this.metrics.gender;
            this.displayBMI(this.metrics.weight, this.metrics.height);
        }
    }

    calculateBMI(weight, height) {
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);
        return bmi.toFixed(1);
    }

    getBMICategory(bmi) {
        if (bmi < 18.5) return 'Underweight';
        if (bmi < 25) return 'Normal';
        if (bmi < 30) return 'Overweight';
        return 'Obese';
    }

    getBMIDescription(category) {
        const descriptions = {
            'Underweight': 'You may need to gain weight. Consult with a healthcare provider.',
            'Normal': 'You have a healthy weight. Keep up the good work!',
            'Overweight': 'You may benefit from losing some weight. Consider a balanced diet and exercise.',
            'Obese': 'Your health may be at risk. Please consult with a healthcare professional.'
        };
        return descriptions[category] || '';
    }

    displayBMI(weight, height) {
        const bmi = this.calculateBMI(weight, height);
        const category = this.getBMICategory(bmi);
        const description = this.getBMIDescription(category);

        document.getElementById('bmiValue').textContent = bmi;
        document.getElementById('bmiCategoryDisplay').textContent = category;
        document.getElementById('bmiDescription').textContent = description;

        // Update circle color based on category
        const circle = document.querySelector('.bmi-circle');
        circle.style.background = this.getBMIGradient(category);
    }

    getBMIGradient(category) {
        const gradients = {
            'Underweight': 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
            'Normal': 'linear-gradient(135deg, #06D6A0 0%, #05A87B 100%)',
            'Overweight': 'linear-gradient(135deg, #FFD23F 0%, #FFA500 100%)',
            'Obese': 'linear-gradient(135deg, #EF476F 0%, #C9184A 100%)'
        };
        return gradients[category] || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }

    // Toast Notification
    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Clear all workouts
function clearAllWorkouts() {
    if (confirm('Are you sure you want to delete all workout history? This cannot be undone.')) {
        app.workouts = [];
        app.saveToStorage('workouts', []);
        app.showToast('All workout history cleared', 'success');
        app.updateDashboard();
        app.loadWorkoutHistory();
    }
}

// Navigation helper for inline onclick
function navigateTo(page) {
    app.navigateTo(page);
}

// Initialize app when DOM is ready
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new FitTrackApp();
});