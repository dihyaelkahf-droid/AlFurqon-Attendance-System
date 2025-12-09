// Authentication Class
class Auth {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check if user is already logged in
        const user = localStorage.getItem('currentUser');
        if (user) {
            this.currentUser = JSON.parse(user);
            this.redirectBasedOnRole();
        }
    }

    login(username, password) {
        const user = db.login(username, password);
        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            return { success: true, user };
        }
        return { 
            success: false, 
            message: 'Username atau password salah. Coba: sutris / sutris123 (admin) atau nita / nita123 (karyawan)' 
        };
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isAdmin() {
        return this.currentUser && this.currentUser.role === 'admin';
    }

    isEmployee() {
        return this.currentUser && this.currentUser.role === 'employee';
    }

    requireAuth() {
        if (!this.currentUser) {
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }

    requireAdmin() {
        if (!this.requireAuth() || !this.isAdmin()) {
            window.location.href = 'employee.html';
            return false;
        }
        return true;
    }

    redirectBasedOnRole() {
        const currentPage = window.location.pathname.split('/').pop();
        
        if (!this.currentUser) return;
        
        if (this.currentUser.role === 'admin') {
            if (currentPage === 'index.html' || currentPage === 'employee.html') {
                window.location.href = 'admin.html';
            }
        } else {
            if (currentPage === 'index.html' || currentPage === 'admin.html') {
                window.location.href = 'employee.html';
            }
        }
    }
}

// Initialize global auth instance

const auth = new Auth();
// Authentication Class - FIXED VERSION
class Auth {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        try {
            // Clear any existing session for testing
            // localStorage.removeItem('currentUser');
            
            const user = localStorage.getItem('currentUser');
            if (user) {
                this.currentUser = JSON.parse(user);
                console.log('User found in session:', this.currentUser);
                this.redirectBasedOnRole();
            }
        } catch (error) {
            console.error('Auth init error:', error);
            localStorage.removeItem('currentUser');
        }
    }

    login(username, password, isAdmin = false) {
        console.log('Auth login called:', { username, password, isAdmin });
        
        const user = db.login(username, password);
        
        if (user) {
            // Validate role if specified
            if (isAdmin && user.role !== 'admin') {
                return { 
                    success: false, 
                    message: 'User ini bukan administrator. Pilih login sebagai karyawan.' 
                };
            }
            
            if (!isAdmin && user.role === 'admin') {
                return { 
                    success: false, 
                    message: 'User ini administrator. Pilih login sebagai admin.' 
                };
            }
            
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            console.log('Login successful:', user);
            
            return { success: true, user };
        }
        
        return { 
            success: false, 
            message: 'Username atau password salah!' 
        };
    }

    logout() {
        console.log('Logging out user:', this.currentUser);
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isAdmin() {
        return this.currentUser && this.currentUser.role === 'admin';
    }

    isEmployee() {
        return this.currentUser && this.currentUser.role === 'employee';
    }

    requireAuth() {
        if (!this.currentUser) {
            console.log('No user, redirecting to login');
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }

    requireAdmin() {
        if (!this.requireAuth() || !this.isAdmin()) {
            console.log('Not admin, redirecting to employee');
            window.location.href = 'employee.html';
            return false;
        }
        return true;
    }

    redirectBasedOnRole() {
        const currentPage = window.location.pathname.split('/').pop();
        
        if (!this.currentUser) {
            if (currentPage !== 'index.html') {
                window.location.href = 'index.html';
            }
            return;
        }
        
        console.log('Redirect check:', { 
            currentPage, 
            role: this.currentUser.role,
            user: this.currentUser.name 
        });
        
        if (this.currentUser.role === 'admin') {
            if (currentPage === 'index.html' || currentPage === 'employee.html') {
                console.log('Admin accessing wrong page, redirecting to admin.html');
                window.location.href = 'admin.html';
            }
        } else {
            if (currentPage === 'index.html' || currentPage === 'admin.html') {
                console.log('Employee accessing wrong page, redirecting to employee.html');
                window.location.href = 'employee.html';
            }
        }
    }
}

// Initialize global auth instance
const auth = new Auth();
