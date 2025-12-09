// SIMPLE DATABASE - FIXED VERSION
console.log('Loading Database...');

class Database {
    constructor() {
        console.log('Database constructor called');
        this.initializeDatabase();
        this.testDatabase();
    }

    initializeDatabase() {
        console.log('Initializing database...');
        
        // Data karyawan yang FIXED
        const defaultEmployees = [
            // ADMIN
            { id: 1, username: 'sutris', password: 'sutris123', name: 'Sutrisno', role: 'admin', position: 'HRD Manager' },
            
            // KARYAWAN
            { id: 2, username: 'nita', password: 'nita123', name: 'Nita Sri Wahyuningrum, S.Pd', role: 'employee', position: 'Guru' },
            { id: 3, username: 'heri', password: 'heri123', name: 'Heri Kurniawan', role: 'employee', position: 'Staff' },
            { id: 4, username: 'yian', password: 'yian123', name: 'Yian Hidayatul Ulfa, S. Pd.', role: 'employee', position: 'Guru' },
            { id: 5, username: 'diah', password: 'diah123', name: 'Diah Aprilia Devi, S.Pd', role: 'employee', position: 'Guru' },
            { id: 6, username: 'teguh', password: 'teguh123', name: 'Teguh Setia Isma Ramadan', role: 'employee', position: 'Staff' },
            { id: 7, username: 'iskandar', password: 'iskandar123', name: 'Iskandar Kholif, S.Pd', role: 'employee', position: 'Guru' },
            { id: 8, username: 'dinul', password: 'dinul123', name: 'Dinul Qoyyimah, S. Pd', role: 'employee', position: 'Guru' },
            { id: 9, username: 'endah', password: 'endah123', name: 'Endah Windarti, S.Pd', role: 'employee', position: 'Guru' },
            { id: 10, username: 'citra', password: 'citra123', name: 'Citra Wulan Sari, S. Pd', role: 'employee', position: 'Guru' },
            { id: 11, username: 'fajri', password: 'fajri123', name: 'Fajriansyah Abdillah', role: 'employee', position: 'Staff' },
            { id: 12, username: 'hamid', password: 'hamid123', name: 'Muh. Abdul Hamid, S.H.I', role: 'employee', position: 'Guru' },
            { id: 13, username: 'nurjayati', password: 'jayati123', name: 'Nurjayati, S.Pd', role: 'employee', position: 'Guru' },
            { id: 14, username: 'riswan', password: 'riswan123', name: 'Riswan Siregar, M.Pd', role: 'employee', position: 'Guru' },
            { id: 15, username: 'rizka', password: 'rizka123', name: 'Rizka Ulfiana, S. Tp', role: 'employee', position: 'Guru' },
            { id: 16, username: 'susi', password: 'susi123', name: 'Susi Dwi Ratna Sari, S.Pd', role: 'employee', position: 'Guru' },
            { id: 17, username: 'usamah', password: 'usamah123', name: 'Usamah Hanif', role: 'employee', position: 'Staff' },
            { id: 18, username: 'zainap', password: 'zainap123', name: 'Zainap Assaihatus Syahidah S. Si', role: 'employee', position: 'Guru' }
        ];

        // Inisialisasi jika belum ada
        if (!localStorage.getItem('absensi_employees')) {
            console.log('Creating fresh employee database...');
            localStorage.setItem('absensi_employees', JSON.stringify(defaultEmployees));
        }

        // Inisialisasi data absensi
        if (!localStorage.getItem('absensi_attendances')) {
            localStorage.setItem('absensi_attendances', JSON.stringify([]));
        }

        // Inisialisasi log
        if (!localStorage.getItem('absensi_logs')) {
            localStorage.setItem('absensi_logs', JSON.stringify([]));
        }
    }

    testDatabase() {
        console.log('Testing database...');
        const employees = this.getEmployees();
        console.log(`Total employees: ${employees.length}`);
        console.log('Employees:', employees.map(e => ({ 
            username: e.username, 
            password: e.password, 
            role: e.role 
        })));
    }

    // ============ LOGIN METHOD ============
    login(username, password) {
        console.log(`Login attempt: ${username}`);
        
        const employees = this.getEmployees();
        const user = employees.find(emp => 
            emp.username === username && emp.password === password
        );
        
        if (user) {
            console.log(`Login SUCCESS: ${user.name} (${user.role})`);
            return user;
        }
        
        console.log(`Login FAILED for: ${username}`);
        console.log('Available users:', employees.map(e => e.username));
        return null;
    }

    // ============ BASIC METHODS ============
    getEmployees() {
        try {
            return JSON.parse(localStorage.getItem('absensi_employees') || '[]');
        } catch (e) {
            console.error('Error getting employees:', e);
            return [];
        }
    }

    getAttendances() {
        try {
            return JSON.parse(localStorage.getItem('absensi_attendances') || '[]');
        } catch (e) {
            console.error('Error getting attendances:', e);
            return [];
        }
    }

    // ... (methods lainnya tetap sama seperti sebelumnya) ...
}

// Buat instance global
const db = new Database();
