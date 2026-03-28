// ===================================
// Supabase Configuration
// ===================================
const supabaseUrl = 'https://kjcgdufjiobkjosxpllh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtqY2dkdWZqaW9ia2pvc3hwbGxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0OTA3NzgsImV4cCI6MjA5MDA2Njc3OH0.jPspgd7KkLUYwFhyjyB9URic8bKuI1KO2rWkuqjM0PA';
// Capture URL hash BEFORE Supabase consumes and destroys it
const originalHash = window.location.hash;

// Rename our variable to supabaseClient so it doesn't collide with the window.supabase object
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

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
// App Management
// ===================================

class FitTrackApp {
    constructor() {
        this.workouts = [];
        this.goal = null;
        this.metrics = null;
        this.currentWeight = null;
        this.user = null;
        this.isSignUp = false; // Auth mode toggle
        this.isSigningUpFlag = false; // Prevents auto-login flash after signup

        this.setupAuthUI();
        this.checkUser();
    }

    // ===================================
    // Authentication Methods
    // ===================================

    setupAuthUI() {
        const toggleBtn = document.getElementById('authToggleBtn');
        const submitBtn = document.getElementById('authSubmitBtn');
        const toggleText = document.getElementById('authToggleText');
        const authForm = document.getElementById('authForm');
        const logoutBtn = document.getElementById('logoutBtn');

        toggleBtn.addEventListener('click', () => {
            this.isSignUp = !this.isSignUp;
            if (this.isSignUp) {
                submitBtn.textContent = 'Create Account';
                toggleText.textContent = 'Already have an account? ';
                toggleBtn.textContent = 'Sign In';
            } else {
                submitBtn.textContent = 'Sign In';
                toggleText.textContent = 'Need an account? ';
                toggleBtn.textContent = 'Sign Up';
            }
        });

        // --- NEW MAGIC LINK LOGIC (Replaces Forgot Password) ---
        const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');

        if (forgotPasswordBtn) {
            forgotPasswordBtn.addEventListener('click', async () => {
                const email = document.getElementById('authEmail').value;
                if (!email) {
                    this.showToast('Please type your email address first, then click Forgot Password.', 'error');
                    return;
                }
                try {
                    // Replaced reset password with a direct OTP Magic Link to just log them straight in
                    const { error } = await supabaseClient.auth.signInWithOtp({
                        email: email,
                        options: {
                            emailRedirectTo: window.location.origin + '/index.html'
                        }
                    });
                    if (error) throw error;
                    this.showToast('Password reset link sent! Check your inbox & Spam folders.', 'success');
                } catch (error) {
                    this.showToast(error.message, 'error');
                }
            });
        }

        authForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('authEmail').value;
            const password = document.getElementById('authPassword').value;
            
            // --- REGEX EMAIL VALIDATION ---
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                this.showToast('Please enter a valid email address (e.g. user@domain.com).', 'error');
                return;
            }
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';

            try {
                if (this.isSignUp) {
                    this.isSigningUpFlag = true;
                    const { data, error } = await supabaseClient.auth.signUp({ email, password });
                    if (error) throw error;
                    
                    // Immediately sign out to prevent auto-login if confirm email is off
                    await supabaseClient.auth.signOut();
                    this.isSigningUpFlag = false;

                    this.showToast('Account created! Please sign in with your credentials.', 'success');
                    
                    // Switch back to Sign In mode
                    this.isSignUp = false;
                    submitBtn.textContent = 'Sign In';
                    submitBtn.disabled = false;
                    toggleText.textContent = 'Need an account? ';
                    toggleBtn.textContent = 'Sign Up';
                    document.getElementById('authPassword').value = ''; // Clear password
                } else {
                    const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
                    if (error) throw error;
                    this.showToast('Welcome back! 🔥', 'success');
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Sign In';
                }
            } catch (error) {
                this.showToast(error.message, 'error');
                this.isSigningUpFlag = false;
                submitBtn.disabled = false;
                submitBtn.textContent = this.isSignUp ? 'Create Account' : 'Sign In';
            }
        });

        logoutBtn.addEventListener('click', async () => {
            await supabaseClient.auth.signOut();
            this.showToast('You have been logged out.', 'success');
        });

        // Listen for Auth changes natively
        supabaseClient.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                // isSigningUpFlag is only briefly true right after creating account
                // Magic link logins MUST always go through, so we clear the flag immediately
                // if the user already existed (magic link = existing user sign in)
                if (this.isSigningUpFlag) {
                    // If the user was just created this session, the created_at & last_sign_in will differ
                    const created = new Date(session.user.created_at).getTime();
                    const lastSignIn = new Date(session.user.last_sign_in_at).getTime();
                    const isNewUser = Math.abs(created - lastSignIn) < 5000; // within 5 seconds = brand new

                    if (!isNewUser) {
                        // Not a new user — this is a magic link login, allow it through
                        this.isSigningUpFlag = false;
                    } else {
                        // Genuinely a new sign-up, skip auto-login
                        return;
                    }
                }
                this.user = session.user;
                this.handleAuthSuccess();
            } else if (event === 'SIGNED_OUT') {
                this.user = null;
                this.handleAuthLogout();
            }
        });
    }

    async checkUser() {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) {
            this.user = session.user;
            this.handleAuthSuccess();
        } else {
            this.handleAuthLogout();
        }
    }

    async handleAuthSuccess() {
        // Hide modal, show logout button
        document.getElementById('authModal').classList.remove('active');
        document.getElementById('logoutBtn').style.display = 'flex';
        
        // Setup username from email or display name
        const meta = this.user.user_metadata || {};
        const displayName = meta.display_name || this.user.email.split('@')[0];
        const username = displayName.charAt(0).toUpperCase() + displayName.slice(1);
        document.getElementById('userName').textContent = username;

        // Load current weight from metadata
        if (meta.current_weight) {
            this.currentWeight = parseFloat(meta.current_weight);
        }

        // Load data from Supabase
        await this.loadAllData();

        // Initialize App Interface
        this.setupNavigation();
        this.setupForms();
        this.setupExerciseDropdown();
        this.setDefaultDate();
        
        // Update views
        // NOTE: updateDashboard() already calls loadGoalDisplay() + loadRecentWorkouts()
        // internally — do NOT call them again here or the slideIn animation resets to
        // opacity:0 mid-display, causing the faded/ghost glitch on Recent Workouts.
        this.updateDashboard();
        this.loadWorkoutHistory();
        this.loadMetricsIntoForm();
    }

    handleAuthLogout() {
        // Show modal, hide logout button
        document.getElementById('authModal').classList.add('active');
        document.getElementById('logoutBtn').style.display = 'none';
        
        // Reset app state
        this.workouts = [];
        this.goal = null;
        this.metrics = null;
    }

    // ===================================
    // Database Operations (Supabase)
    // ===================================

    async loadAllData() {
        try {
            // Load Workouts
            const { data: workData, error: workErr } = await supabaseClient
                .from('workouts')
                .select('*')
                .order('date', { ascending: false });
            if (workErr) throw workErr;
            this.workouts = workData || [];

            // Load Goal
            const { data: goalData, error: goalErr } = await supabaseClient
                .from('goals')
                .select('*')
                .eq('user_id', this.user.id)
                .single();
            if (goalErr && goalErr.code !== 'PGRST116') throw goalErr; // PGRST116 is "No rows returned"
            this.goal = goalData || null;

            // Load Metrics
            const { data: metData, error: metErr } = await supabaseClient
                .from('metrics')
                .select('*')
                .eq('user_id', this.user.id)
                .single();
            if (metErr && metErr.code !== 'PGRST116') throw metErr;
            this.metrics = metData || null;
            
        } catch (error) {
            console.error("Error loading data from Supabase:", error);
            this.showToast('Error loading your data.', 'error');
        }
    }

    // ===================================
    // Navigation
    // ===================================
    
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn:not(.logout-btn)');
        // Remove old listeners to prevent duplicates on relogin
        const navBar = document.querySelector('.nav-menu');
        const newNavBar = navBar.cloneNode(true);
        navBar.parentNode.replaceChild(newNavBar, navBar);
        
        // Re-attach setupAuthUI listeners to the new cloned buttons
        this.setupAuthUI();

        const newNavButtons = document.querySelectorAll('.nav-btn:not(.logout-btn)');
        newNavButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.getAttribute('data-page');
                if(page) this.navigateTo(page);
            });
        });

        // Current Weight Form
        const cwForm = document.getElementById('currentWeightForm');
        if (cwForm) {
            cwForm.replaceWith(cwForm.cloneNode(true));
            document.getElementById('currentWeightForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                const cw = parseFloat(document.getElementById('currentWeight').value);
                if (isNaN(cw)) return;
                try {
                    await supabaseClient.auth.updateUser({ data: { current_weight: cw } });
                    this.currentWeight = cw;
                    this.showToast('Weight updated! ⚖️', 'success');
                    this.updateWeightProgressDisplay();
                } catch (err) {
                    this.showToast('Error saving weight: ' + err.message, 'error');
                }
            });
        }
    }

    updateWeightProgressDisplay() {
        const display = document.getElementById('weightProgressDisplay');
        if (!display || !this.currentWeight || !this.goal || !this.goal.target_weight) {
            if (display) display.style.display = 'none';
            return;
        }
        const startW = this.metrics && this.metrics.weight ? parseFloat(this.metrics.weight) : this.currentWeight;
        const targetW = parseFloat(this.goal.target_weight);
        const currentW = this.currentWeight;

        // Progress = how much of the gap has been closed
        const totalGap = Math.abs(startW - targetW);
        if (totalGap === 0) { display.style.display = 'none'; return; }

        const closed = Math.abs(startW - currentW);
        const pct = Math.min(100, Math.max(0, Math.round((closed / totalGap) * 100)));

        display.style.display = 'block';
        document.getElementById('weightProgressBar').style.width = pct + '%';
        document.getElementById('weightProgressPct').textContent = pct + '%';
        document.getElementById('weightProgressLabel').textContent = `Current: ${currentW} kg`;
        document.getElementById('weightTargetLabel').textContent = `Target: ${targetW} kg`;
    }

    renderGoalSummary() {
        const summaryView = document.getElementById('goalSummaryView');
        const summaryContent = document.getElementById('goalSummaryContent');
        const goalForm = document.getElementById('goalForm');
        const editBtn = document.getElementById('editGoalBtn');
        const cancelBtn = document.getElementById('cancelGoalEdit');

        if (!summaryView || !goalForm) return;

        if (!this.goal) {
            // No goal yet — show form, hide summary
            summaryView.style.display = 'none';
            goalForm.style.display = 'block';
            if (editBtn) editBtn.style.display = 'none';
            if (cancelBtn) cancelBtn.style.display = 'none';
            return;
        }

        const goalTypeNames = {
            'weight-loss': '⚖️ Weight Loss',
            'muscle-gain': '💪 Muscle Gain',
            'maintain': '🔄 Maintain Weight',
            'endurance': '🏃 Build Endurance',
            'flexibility': '🧘 Improve Flexibility'
        };

        const rows = [
            { label: 'Goal', value: goalTypeNames[this.goal.type] || this.goal.type },
            this.goal.target_weight ? { label: 'Target Weight', value: `${this.goal.target_weight} kg` } : null,
            this.currentWeight ? { label: 'Current Weight', value: `${this.currentWeight} kg` } : null,
            { label: 'Target Date', value: new Date(this.goal.target_date).toLocaleDateString(undefined, { year:'numeric', month:'long', day:'numeric' }) },
            { label: 'Weekly Workouts', value: `${this.goal.weekly_workouts} days/week` },
            this.goal.notes ? { label: 'Notes', value: this.goal.notes } : null
        ].filter(Boolean);

        summaryContent.innerHTML = rows.map(r => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:0.5rem; border-bottom:1px solid rgba(255,255,255,0.06);">
                <span style="color:var(--text-secondary); font-size:0.9rem;">${r.label}</span>
                <strong style="color:var(--text-primary);">${r.value}</strong>
            </div>
        `).join('');

        // Show summary, hide form
        summaryView.style.display = 'block';
        goalForm.style.display = 'none';
        if (editBtn) editBtn.style.display = 'inline-flex';
        if (cancelBtn) cancelBtn.style.display = 'none';
    }

    navigateTo(page) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById(page).classList.add('active');

        document.querySelectorAll('.nav-btn:not(.logout-btn)').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        // Load profile data when navigating to profile page
        if (page === 'profile' && this.user) {
            const email = this.user.email || '';
            const meta = this.user.user_metadata || {};
            const name = meta.display_name || '';
            const cw = meta.current_weight || '';
            const initial = name ? name[0].toUpperCase() : (email ? email[0].toUpperCase() : '?');
            document.getElementById('profileAvatar').textContent = initial;
            document.getElementById('profileEmail').textContent = email;
            document.getElementById('profileDisplayName').value = name;
            if (cw) {
                document.getElementById('currentWeight').value = cw;
                this.currentWeight = parseFloat(cw);
                this.updateWeightProgressDisplay();
            }
            // Pre-fill goal form if goal exists and show summary
            this.renderGoalSummary();
            if (this.goal) {
                const gt = document.getElementById('goalType');
                if (gt) gt.value = this.goal.type || '';
                const twg = document.getElementById('targetWeightGroup');
                const cwg = document.getElementById('currentWeightGroup');
                if (this.goal.type === 'weight-loss' || this.goal.type === 'muscle-gain') {
                    if (twg) twg.style.display = 'block';
                    if (cwg) cwg.style.display = 'block';
                    document.getElementById('targetWeight').value = this.goal.target_weight || '';
                } else {
                    if (twg) twg.style.display = 'none';
                    if (cwg) cwg.style.display = 'none';
                }
                document.getElementById('targetDate').value = this.goal.target_date || '';
                document.getElementById('weeklyWorkouts').value = this.goal.weekly_workouts || '';
                document.getElementById('notes').value = this.goal.notes || '';
            }
        }

        window.scrollTo(0, 0);
    }

    // ===================================
    // Setup Forms
    // ===================================
    
    setupForms() {
        // Goal Form
        const goalForm = document.getElementById('goalForm');
        // Clear listeners
        goalForm.replaceWith(goalForm.cloneNode(true));
        document.getElementById('goalForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveGoal();
        });

        // Show/hide target weight based on goal type
        document.getElementById('goalType').addEventListener('change', (e) => {
            const targetWeightGroup = document.getElementById('targetWeightGroup');
            const currentWeightGroup = document.getElementById('currentWeightGroup');
            if (e.target.value === 'weight-loss' || e.target.value === 'muscle-gain') {
                targetWeightGroup.style.display = 'block';
                currentWeightGroup.style.display = 'block';
                document.getElementById('targetWeight').required = true;
            } else {
                targetWeightGroup.style.display = 'none';
                currentWeightGroup.style.display = 'none';
                document.getElementById('targetWeight').required = false;
            }
        });

        // Workout Form
        const workoutForm = document.getElementById('workoutForm');
        workoutForm.replaceWith(workoutForm.cloneNode(true));
        document.getElementById('workoutForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveWorkout();
        });

        // Metrics Form
        const metricsForm = document.getElementById('metricsForm');
        metricsForm.replaceWith(metricsForm.cloneNode(true));
        document.getElementById('metricsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveMetrics();
        });

        // Filter workout history
        const filterCategory = document.getElementById('filterCategory');
        filterCategory.replaceWith(filterCategory.cloneNode(true));
        document.getElementById('filterCategory').addEventListener('change', () => {
            this.loadWorkoutHistory();
        });

        // Edit Workout Modal Form
        const editWorkoutForm = document.getElementById('editWorkoutForm');
        editWorkoutForm.replaceWith(editWorkoutForm.cloneNode(true));
        document.getElementById('editWorkoutForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.saveEditedWorkout();
        });

        // Profile Form
        const profileForm = document.getElementById('profileForm');
        profileForm.replaceWith(profileForm.cloneNode(true));
        document.getElementById('profileForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('profileDisplayName').value.trim();
            if (!name) { this.showToast('Please enter a display name.', 'error'); return; }
            try {
                const { error } = await supabaseClient.auth.updateUser({ data: { display_name: name } });
                if (error) throw error;
                // Update the welcome header too
                document.getElementById('userName').textContent = name;
                this.showToast('Profile saved! 👤', 'success');
            } catch (err) {
                this.showToast('Error saving profile: ' + err.message, 'error');
            }
        });
    }

    // ===================================
    // Setup Exercise Dropdown
    // ===================================
    
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

    setDefaultDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('workoutDate').value = today;
        document.getElementById('targetDate').min = today;
    }

    // ===================================
    // Saving Data to Supabase
    // ===================================

    async saveGoal() {
        const goalType = document.getElementById('goalType').value;
        const targetWeight = document.getElementById('targetWeight').value;
        const targetDate = document.getElementById('targetDate').value;
        const weeklyWorkouts = document.getElementById('weeklyWorkouts').value;
        const notes = document.getElementById('notes').value;

        const goalData = {
            user_id: this.user.id,
            type: goalType,
            target_weight: targetWeight || null,
            target_date: targetDate,
            weekly_workouts: parseInt(weeklyWorkouts),
            notes: notes || null
        };

        // Also save current weight if provided
        const cwInput = document.getElementById('currentWeight');
        if (cwInput && cwInput.value) {
            const cw = parseFloat(cwInput.value);
            if (!isNaN(cw)) {
                this.currentWeight = cw;
                await supabaseClient.auth.updateUser({ data: { current_weight: cw } });
            }
        }

        // Save goal_start_date ONLY when setting a goal for the first time
        const existingMeta = this.user?.user_metadata || {};
        if (!existingMeta.goal_start_date) {
            const today = new Date().toISOString().split('T')[0];
            await supabaseClient.auth.updateUser({ data: { goal_start_date: today } });
            this.user.user_metadata = { ...existingMeta, goal_start_date: today };
        }

        try {
            const { data, error } = await supabaseClient.from('goals').upsert(goalData).select();
            if (error) throw error;
            
            this.goal = goalData;
            this.showToast('Goal saved! 🎯', 'success');
            this.loadGoalDisplay();
            this.renderGoalSummary();
            this.navigateTo('dashboard');
        } catch (error) {
            console.error('GOAL SAVE ERROR:', error.message, error);
            this.showToast(`Error saving goal: ${error.message}`, 'error');
        }
    }

    loadGoalDisplay() {
        const goalDisplay = document.getElementById('goalDisplay');
        
        if (!this.goal) {
            goalDisplay.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🎯</div>
                    <p>No goal set yet. Start by setting your fitness goal!</p>
                    <button class="btn btn-primary" onclick="app.navigateTo('profile')">Set Your Goal</button>
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
                <div class="goal-type">${goalTypeNames[this.goal.type] || 'Fitness Goal'}</div>
                <div class="goal-details">
                    ${this.goal.target_weight ? `
                        <div class="goal-detail">
                            <span>Target Weight:</span>
                            <strong>${this.goal.target_weight} kg</strong>
                        </div>
                    ` : ''}
                    <div class="goal-detail">
                        <span>Target Date:</span>
                        <strong>${new Date(this.goal.target_date).toLocaleDateString()}</strong>
                    </div>
                    <div class="goal-detail">
                        <span>Weekly Workouts:</span>
                        <strong>${this.goal.weekly_workouts} days</strong>
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

        // --- GOAL PROGRESS BAR ---
        if (this.goal.target_date) {
            const meta = this.user?.user_metadata || {};
            // Use saved goal_start_date, or fall back to 30 days before target
            let start;
            if (meta.goal_start_date) {
                start = new Date(meta.goal_start_date);
            } else {
                // Fallback: estimate start as 30 days ago so bar is never stuck at 0
                start = new Date();
                start.setDate(start.getDate() - 30);
            }
            const end = new Date(this.goal.target_date);
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            start.setHours(0, 0, 0, 0);
            end.setHours(0, 0, 0, 0);

            const totalDays = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
            const elapsed = Math.max(0, Math.round((now - start) / (1000 * 60 * 60 * 24)));
            const pct = Math.min(100, Math.round((elapsed / totalDays) * 100));
            const daysLeft = Math.max(0, Math.round((end - now) / (1000 * 60 * 60 * 24)));

            document.getElementById('goalProgressContainer').style.display = 'block';
            document.getElementById('goalProgressBar').style.width = pct + '%';
            document.getElementById('goalProgressPct').textContent = pct + '%';
            document.getElementById('goalDaysLeft').textContent = daysLeft > 0 ? `${daysLeft} days left` : '🎉 Target Date Reached!';
            document.getElementById('goalTargetDate').textContent = end.toLocaleDateString();
        }
    }

    async saveWorkout() {
        const category = document.getElementById('workoutCategory').value;
        const exerciseName = document.getElementById('exerciseName').value;
        const duration = parseInt(document.getElementById('duration').value);
        const intensity = document.getElementById('intensity').value;
        const date = document.getElementById('workoutDate').value;

        const calories = this.calculateCalories(category, exerciseName, duration, intensity);

        const workoutData = {
            user_id: this.user.id,
            category,
            name: exerciseName,
            duration,
            intensity,
            calories,
            date
        };

        try {
            const { data, error } = await supabaseClient.from('workouts').insert([workoutData]).select();
            if (error) throw error;

            this.workouts.unshift(data[0]); // Add new workout to beginning of array
            
            // Reset form
            document.getElementById('workoutForm').reset();
            document.getElementById('exerciseSelectGroup').style.display = 'none';
            document.getElementById('calorieEstimate').style.display = 'none';
            this.setDefaultDate();

            this.showToast(`Workout logged! 🔥 ${calories} calories burned!`, 'success');
            this.updateDashboard();
            this.loadWorkoutHistory();
        } catch (error) {
            console.error('WORKOUT SAVE ERROR:', error.message, error);
            this.showToast(`Error saving workout: ${error.message}`, 'error');
        }
    }

    // ===================================
    // Dashboard & History
    // ===================================

    // Parse a "YYYY-MM-DD" date string as a LOCAL date (avoids UTC midnight timezone shift)
    parseLocalDate(dateStr) {
        if (!dateStr) return new Date();
        const [year, month, day] = String(dateStr).split('T')[0].split('-').map(Number);
        return new Date(year, month - 1, day);
    }

    updateDashboard() {
        const totalCalories = this.workouts.reduce((sum, w) => sum + w.calories, 0);
        const totalWorkouts = this.workouts.length;
        const totalDuration = this.workouts.reduce((sum, w) => sum + w.duration, 0);

        // --- NEW FEATURE: GAMIFICATION STREAKS ---
        let currentStreak = 0;
        if (this.workouts.length > 0) {
            // Use parseLocalDate to avoid UTC timezone shift on bare date strings
            const dates = [...new Set(this.workouts.map(w => this.parseLocalDate(w.date).toDateString()))]
                .map(d => new Date(d))
                .sort((a, b) => b - a);

            let today = new Date();
            today.setHours(0,0,0,0);
            let yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);

            let checkDate = new Date(dates[0]);
            checkDate.setHours(0,0,0,0);

            if (checkDate.getTime() === today.getTime() || checkDate.getTime() === yesterday.getTime()) {
                currentStreak = 1;
                let expectedNextDate = new Date(checkDate);
                expectedNextDate.setDate(expectedNextDate.getDate() - 1);

                for (let i = 1; i < dates.length; i++) {
                    let d = new Date(dates[i]);
                    d.setHours(0,0,0,0);
                    if (d.getTime() === expectedNextDate.getTime()) {
                        currentStreak++;
                        expectedNextDate.setDate(expectedNextDate.getDate() - 1);
                    } else {
                        break;
                    }
                }
            }
        }
        document.getElementById('currentStreak').textContent = currentStreak;

        // --- END STREAK FEATURE ---

        // Update DOM elements
        document.getElementById('totalCalories').textContent = totalCalories;
        document.getElementById('totalWorkouts').textContent = totalWorkouts;
        document.getElementById('totalDuration').textContent = totalDuration;

        // --- NEW FEATURE: DATA VISUALIZATION (CHART.JS) ---
        const ctx = document.getElementById('calorieChart');
        if (ctx) {
            if (this.calorieChartInstance) {
                this.calorieChartInstance.destroy();
            }
            
            const labels = [];
            const data = [];
            for (let i = 6; i >= 0; i--) {
                const d = new Date();
                d.setDate(d.getDate() - i);
                labels.push(d.toLocaleDateString(undefined, { weekday: 'short' }));
                
                const dateStr = d.toDateString();
                const dayCals = this.workouts
                    .filter(w => this.parseLocalDate(w.date).toDateString() === dateStr)
                    .reduce((sum, w) => sum + w.calories, 0);
                data.push(dayCals);
            }

            this.calorieChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Calories Burned',
                        data: data,
                        borderColor: '#FF7043',
                        backgroundColor: 'rgba(255, 112, 67, 0.2)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true,
                        pointBackgroundColor: '#FFD23F',
                        pointRadius: 5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { 
                            beginAtZero: true, 
                            grid: { color: 'rgba(255,255,255,0.05)' },
                            ticks: { color: 'rgba(255,255,255,0.5)' }
                        },
                        x: { 
                            grid: { display: false },
                            ticks: { color: 'rgba(255,255,255,0.5)' }
                        }
                    },
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }
        // --- END CHART FEATURE ---

        this.loadGoalDisplay();
        if (this.metrics) {
            const bmi = this.calculateBMI(this.metrics.weight, this.metrics.height);
            const category = this.getBMICategory(bmi);
            document.getElementById('currentBMI').textContent = bmi;
            document.getElementById('bmiCategory').textContent = category;
        }

        this.loadRecentWorkouts();
    }

    loadRecentWorkouts() {
        const recentList = document.getElementById('recentWorkoutsList');
        const recentWorkouts = this.workouts.slice(0, 5); // Assuming already sorted descending

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
                        <div class="workout-detail">📅 ${this.parseLocalDate(workout.date).toLocaleDateString()}</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    loadWorkoutHistory() {
        const historyList = document.getElementById('workoutHistory');
        const filterCategory = document.getElementById('filterCategory').value;

        let filteredWorkouts = [...this.workouts];
        
        if (filterCategory !== 'all') {
            filteredWorkouts = filteredWorkouts.filter(w => w.category === filterCategory);
        }

        // Sort descending by date (use parseLocalDate for consistent comparison)
        filteredWorkouts.sort((a, b) => this.parseLocalDate(b.date) - this.parseLocalDate(a.date));

        if (filteredWorkouts.length === 0) {
            historyList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">📝</div>
                    <p>No workout history yet. Start logging your workouts!</p>
                </div>
            `;
            return;
        }

        // Group workouts by day — use parseLocalDate so IST/+ve offset timezones don't shift dates
        const groupedWorkouts = {};
        filteredWorkouts.forEach(workout => {
            const dateStr = this.parseLocalDate(workout.date).toLocaleDateString(undefined, {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });
            if (!groupedWorkouts[dateStr]) groupedWorkouts[dateStr] = [];
            groupedWorkouts[dateStr].push(workout);
        });

        let historyHtml = '';
        for (const [dateStr, dayWorkouts] of Object.entries(groupedWorkouts)) {
            historyHtml += `
                <div class="history-day-group" style="margin-top: 2rem;">
                    <h3 style="color: var(--primary); border-bottom: 2px solid var(--border); padding-bottom: 0.5rem; margin-bottom: 1rem; font-size: 1.2rem;">📅 ${dateStr}</h3>
                    <div class="workout-list" style="display: flex; flex-direction: column; gap: var(--spacing-md);">
                        ${dayWorkouts.map(workout => `
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
                                    </div>
                                </div>
                                <div class="workout-actions">
                                    <button class="btn-icon" onclick="openEditModal('${workout.id}', ${workout.duration}, '${workout.intensity}', '${workout.date}')" title="Edit">✏️</button>
                                    <button class="btn-icon" onclick="app.deleteWorkout('${workout.id}')" title="Delete">🗑️</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        historyList.innerHTML = historyHtml;
    }

    async saveEditedWorkout() {
        const id = document.getElementById('editWorkoutId').value;
        const duration = parseInt(document.getElementById('editDuration').value);
        const intensity = document.getElementById('editIntensity').value;
        const date = document.getElementById('editDate').value;

        try {
            const { error } = await supabaseClient
                .from('workouts')
                .update({ duration, intensity, date })
                .eq('id', id)
                .eq('user_id', this.user.id);
            if (error) throw error;

            // Update local array
            const idx = this.workouts.findIndex(w => String(w.id) === String(id));
            if (idx !== -1) {
                this.workouts[idx].duration = duration;
                this.workouts[idx].intensity = intensity;
                this.workouts[idx].date = date;
            }

            document.getElementById('editWorkoutModal').style.display = 'none';
            this.showToast('Workout updated! ✏️', 'success');
            this.updateDashboard();
            this.loadWorkoutHistory();
        } catch (err) {
            this.showToast('Error updating workout: ' + err.message, 'error');
        }
    }

    async deleteWorkout(id) {
        if (confirm('Are you sure you want to delete this workout?')) {
            try {
                const { error } = await supabaseClient.from('workouts').delete().eq('id', id).eq('user_id', this.user.id);
                if (error) throw error;
                
                this.workouts = this.workouts.filter(w => String(w.id) !== String(id));
                this.showToast('Workout deleted', 'success');
                this.updateDashboard();
                this.loadWorkoutHistory();
            } catch (error) {
                console.error(error);
                this.showToast('Failed to delete workout', 'error');
            }
        }
    }

    // ===================================
    // Metrics Profile
    // ===================================

    async saveMetrics() {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const age = parseInt(document.getElementById('age').value) || null;
        const gender = document.getElementById('gender').value;

        const metricsData = {
            user_id: this.user.id,
            weight,
            height,
            age,
            gender
        };

        try {
            const { data, error } = await supabaseClient.from('metrics').upsert(metricsData).select();
            if (error) throw error;

            this.metrics = metricsData;
            this.displayBMI(weight, height);
            this.showToast('Metrics updated successfully! 📊', 'success');
            this.updateDashboard();
        } catch (error) {
            console.error(error);
            this.showToast('Error saving metrics!', 'error');
        }
    }

    loadMetricsIntoForm() {
        if (this.metrics) {
            document.getElementById('weight').value = this.metrics.weight;
            document.getElementById('height').value = this.metrics.height;
            if (this.metrics.age) document.getElementById('age').value = this.metrics.age;
            if (this.metrics.gender) document.getElementById('gender').value = this.metrics.gender;
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

        if (document.getElementById('bmiValue')) document.getElementById('bmiValue').textContent = bmi;
        if (document.getElementById('bmiCategoryDisplay')) document.getElementById('bmiCategoryDisplay').textContent = category;
        if (document.getElementById('bmiDescription')) document.getElementById('bmiDescription').textContent = description;

        const circle = document.querySelector('.bmi-circle');
        if (circle) circle.style.background = this.getBMIGradient(category);

        // --- NEW FEATURE: BMR & TDEE CALCULATION ---
        if (this.metrics && document.getElementById('bmrValue')) {
            const age = parseInt(this.metrics.age) || 0;
            const gender = this.metrics.gender || 'other';

            if (age > 0 && weight > 0 && height > 0) {
                let bmr = (10 * weight) + (6.25 * height) - (5 * age);
                if (gender === 'male') bmr += 5;
                else if (gender === 'female') bmr -= 161;
                else bmr -= 78; // Splitting difference for other

                document.getElementById('bmrValue').textContent = Math.round(bmr).toLocaleString() + ' kcal';

                // Rough Activity Multiplier based on Goal
                let weeklyWorkouts = this.goal && this.goal.weeklyWorkouts ? parseInt(this.goal.weeklyWorkouts) : 3;
                let multiplier = 1.2; // Sedentary
                if (weeklyWorkouts >= 1 && weeklyWorkouts <= 3) multiplier = 1.375;
                if (weeklyWorkouts >= 4 && weeklyWorkouts <= 5) multiplier = 1.550;
                if (weeklyWorkouts >= 6) multiplier = 1.725;

                const tdee = bmr * multiplier;
                document.getElementById('tdeeValue').textContent = Math.round(tdee).toLocaleString() + ' kcal';
            } else {
                document.getElementById('bmrValue').textContent = 'Needs Age';
                document.getElementById('tdeeValue').textContent = '--';
            }
        }
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

    // ===================================
    // Utilities
    // ===================================

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = `toast ${type} show`;

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

// Clear all workouts (Updating to delete all specific user workouts)
async function clearAllWorkouts() {
    if (confirm('Are you sure you want to delete all workout history? This cannot be undone.')) {
        try {
            const { error } = await supabaseClient.from('workouts').delete().eq('user_id', app.user.id);
            if (error) throw error;
            
            app.workouts = [];
            app.showToast('All workout history cleared', 'success');
            app.updateDashboard();
            app.loadWorkoutHistory();
        } catch (error) {
            console.error(error);
            app.showToast('Failed to clear workouts', 'error');
        }
    }
}

// Export all workouts to CSV
function exportToCsv() {
    if (!app.workouts || app.workouts.length === 0) {
        app.showToast('No workouts to export!', 'error');
        return;
    }

    const headers = ['Date', 'Exercise Name', 'Category', 'Duration (min)', 'Calories', 'Intensity'];
    const csvRows = [headers.join(',')];

    app.workouts.forEach(workout => {
        const dateStr = new Date(workout.date).toLocaleDateString();
        const name = workout.name || workout.exercise || '';
        const escapedName = name.replace(/"/g, '""'); // Escape quotes for CSV
        
        const values = [
            `"${dateStr}"`,
            `"${escapedName}"`,
            `"${workout.category}"`,
            workout.duration,
            workout.calories,
            `"${workout.intensity}"`
        ];
        csvRows.push(values.join(','));
    });

    const csvData = csvRows.join('\n');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'fittrack_history.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    app.showToast('Data exported successfully!', 'success');
}

function navigateTo(page) {
    app.navigateTo(page);
}

function openEditModal(id, duration, intensity, date) {
    document.getElementById('editWorkoutId').value = id;
    document.getElementById('editDuration').value = duration;
    document.getElementById('editIntensity').value = intensity;
    document.getElementById('editDate').value = date.split('T')[0];
    document.getElementById('editWorkoutModal').style.display = 'flex';
}

function closeEditModal() {
    document.getElementById('editWorkoutModal').style.display = 'none';
}

function toggleGoalForm() {
    const summaryView = document.getElementById('goalSummaryView');
    const goalForm = document.getElementById('goalForm');
    const editBtn = document.getElementById('editGoalBtn');
    const cancelBtn = document.getElementById('cancelGoalEdit');
    const isFormVisible = goalForm.style.display !== 'none';

    if (isFormVisible) {
        // Cancel — go back to summary
        summaryView.style.display = 'block';
        goalForm.style.display = 'none';
        if (editBtn) editBtn.style.display = 'inline-flex';
        if (cancelBtn) cancelBtn.style.display = 'none';
    } else {
        // Show the form for editing
        summaryView.style.display = 'none';
        goalForm.style.display = 'block';
        if (editBtn) editBtn.style.display = 'none';
        if (cancelBtn) cancelBtn.style.display = 'inline-flex';
    }
}

// Initialize app
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new FitTrackApp();

    // Register PWA Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
            .then(reg => { /* PWA registered successfully */ })
            .catch(err => console.warn('Service Worker registration failed', err));
    }
});