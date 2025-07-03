
import { useState } from 'react';
import { Firewall } from "@/contexts/FirewallContext";

interface FormData {
  name: string;
  apiUrl: string;
  apiKey: string;
  type: 'UDM' | 'UCG';
}

export const useFirewallForm = (firewall?: Firewall) => {
  const [formData, setFormData] = useState<FormData>({
    name: firewall?.name || '',
    apiUrl: firewall?.apiUrl || '',
    apiKey: firewall?.apiKey || '',
    type: firewall?.type || 'UDM' as 'UDM' | 'UCG',
  });

  const updateFormData = (field: keyof FormData, value: string | 'UDM' | 'UCG') => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({ name: '', apiUrl: '', apiKey: '', type: 'UDM' });
  };

  const validateForm = () => {
    if (!formData.name || !formData.apiUrl || !formData.apiKey) {
      return { isValid: false, error: "Nome, URL da API e API Key são obrigatórios." };
    }

    try {
      new URL(formData.apiUrl);
    } catch {
      return { isValid: false, error: "URL da API inválida." };
    }

    return { isValid: true, error: null };
  };

  const formatApiUrl = (url: string) => {
    let apiUrl = url;
    if (!apiUrl.includes('/proxy/network/integration/v1')) {
      apiUrl = apiUrl.replace(/\/$/, '');
      apiUrl = `${apiUrl}/proxy/network/integration/v1`;
    }
    return apiUrl;
  };

  return {
    formData,
    updateFormData,
    resetForm,
    validateForm,
    formatApiUrl,
  };
};
