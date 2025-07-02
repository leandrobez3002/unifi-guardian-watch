
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Firewall {
  id: string;
  name: string;
  apiUrl: string;
  type: 'UDM' | 'UCG';
  status: 'online' | 'offline' | 'error';
  lastUpdated?: Date;
}

interface FirewallContextType {
  firewalls: Firewall[];
  activeFirewall: Firewall | null;
  addFirewall: (firewall: Omit<Firewall, 'id' | 'status'>) => void;
  updateFirewall: (id: string, firewall: Partial<Firewall>) => void;
  removeFirewall: (id: string) => void;
  setActiveFirewall: (firewall: Firewall) => void;
}

const FirewallContext = createContext<FirewallContextType | undefined>(undefined);

export const useFirewall = () => {
  const context = useContext(FirewallContext);
  if (!context) {
    throw new Error('useFirewall must be used within a FirewallProvider');
  }
  return context;
};

export const FirewallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firewalls, setFirewalls] = useState<Firewall[]>([]);
  const [activeFirewall, setActiveFirewall] = useState<Firewall | null>(null);

  // Carrega os firewalls do localStorage
  useEffect(() => {
    const savedFirewalls = localStorage.getItem('unifi-firewalls');
    if (savedFirewalls) {
      const parsed = JSON.parse(savedFirewalls);
      setFirewalls(parsed);
      if (parsed.length > 0) {
        setActiveFirewall(parsed[0]);
      }
    }
  }, []);

  // Salva os firewalls no localStorage
  useEffect(() => {
    if (firewalls.length > 0) {
      localStorage.setItem('unifi-firewalls', JSON.stringify(firewalls));
    }
  }, [firewalls]);

  const addFirewall = (firewallData: Omit<Firewall, 'id' | 'status'>) => {
    const newFirewall: Firewall = {
      ...firewallData,
      id: Date.now().toString(),
      status: 'offline',
      lastUpdated: new Date(),
    };
    
    setFirewalls(prev => [...prev, newFirewall]);
    
    if (!activeFirewall) {
      setActiveFirewall(newFirewall);
    }
  };

  const updateFirewall = (id: string, updates: Partial<Firewall>) => {
    setFirewalls(prev => 
      prev.map(fw => 
        fw.id === id ? { ...fw, ...updates, lastUpdated: new Date() } : fw
      )
    );
    
    if (activeFirewall?.id === id) {
      setActiveFirewall(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const removeFirewall = (id: string) => {
    setFirewalls(prev => prev.filter(fw => fw.id !== id));
    
    if (activeFirewall?.id === id) {
      setActiveFirewall(firewalls.find(fw => fw.id !== id) || null);
    }
  };

  return (
    <FirewallContext.Provider value={{
      firewalls,
      activeFirewall,
      addFirewall,
      updateFirewall,
      removeFirewall,
      setActiveFirewall,
    }}>
      {children}
    </FirewallContext.Provider>
  );
};
