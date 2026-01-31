import fs from 'fs';
import path from 'path';

// Define the shape of our Lead data
export interface Lead {
    id: string;
    createdAt: string;
    name: string;
    email: string;
    phone: string;
    status: 'new' | 'contacted' | 'booked';
    diagnosis?: any; // Store the full AI report
    packageInterest?: string;
    notes?: string;
}

const DB_PATH = path.join(process.cwd(), 'data', 'leads.json');
const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure database file exists
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
}

export const dbService = {
    getAllLeads: async (): Promise<Lead[]> => {
        try {
            const data = fs.readFileSync(DB_PATH, 'utf-8');
            return JSON.parse(data) as Lead[];
        } catch (error) {
            console.error("Error reading database:", error);
            return [];
        }
    },

    saveLead: async (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<Lead> => {
        const leads = await dbService.getAllLeads();

        const newLead: Lead = {
            ...lead,
            id: Math.random().toString(36).substring(2, 10), // Simple ID generation
            createdAt: new Date().toISOString(),
            status: 'new'
        };

        leads.unshift(newLead); // Add to top
        fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2));

        return newLead;
    },

    updateLead: async (id: string, updates: Partial<Lead>): Promise<Lead | null> => {
        const leads = await dbService.getAllLeads();
        const index = leads.findIndex(l => l.id === id);

        if (index === -1) return null;

        const updatedLead = { ...leads[index], ...updates };
        leads[index] = updatedLead;

        fs.writeFileSync(DB_PATH, JSON.stringify(leads, null, 2));
        return updatedLead;
    },

    // Finds a lead by email/phone to update existing assessments instead of creating duplicates
    findLeadByContact: async (email: string): Promise<Lead | undefined> => {
        const leads = await dbService.getAllLeads();
        // Return mostly recently created match
        return leads.find(l => l.email.toLowerCase() === email.toLowerCase());
    }
};
