
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useFirewallConnection = () => {
  const [testing, setTesting] = useState(false);
  const { toast } = useToast();

  const testConnection = async (apiUrl: string, apiKey: string) => {
    if (!apiUrl || !apiKey) {
      toast({
        title: "Erro",
        description: "URL da API e API Key são obrigatórios para o teste.",
        variant: "destructive",
      });
      return;
    }

    setTesting(true);
    
    try {
      // Ajustar a URL para o formato correto da API UniFi
      let formattedApiUrl = apiUrl;
      if (!formattedApiUrl.includes('/proxy/network/integration/v1')) {
        formattedApiUrl = formattedApiUrl.replace(/\/$/, '');
        formattedApiUrl = `${formattedApiUrl}/proxy/network/integration/v1`;
      }

      console.log('Testando conexão com:', formattedApiUrl);

      const response = await fetch(`${formattedApiUrl}/sites`, {
        method: 'GET',
        headers: {
          'X-API-KEY': apiKey,
          'Accept': 'application/json',
        },
        // Adicionar configurações para lidar com CORS e HTTPS
        mode: 'cors',
        credentials: 'omit',
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Conexão bem-sucedida!",
          description: `Conectado com sucesso. ${data.length || 0} site(s) encontrado(s).`,
        });
      } else {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Erro ao testar conexão:', error);
      
      let errorMessage = "Erro desconhecido ao conectar com a API.";
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = "Falha na conexão. Verifique:\n• Se a URL está correta\n• Se o dispositivo está acessível na rede\n• Se há problemas de CORS (tente acessar via HTTPS)";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: "Falha na conexão",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setTesting(false);
    }
  };

  return { testing, testConnection };
};
