
import React from 'react';
import { Button } from "@/components/ui/button";
import { Wifi, Loader2 } from "lucide-react";
import { useFirewallConnection } from "@/hooks/useFirewallConnection";

interface ConnectionTestButtonProps {
  apiUrl: string;
  apiKey: string;
}

const ConnectionTestButton: React.FC<ConnectionTestButtonProps> = ({ apiUrl, apiKey }) => {
  const { testing, testConnection } = useFirewallConnection();

  const handleTest = () => {
    testConnection(apiUrl, apiKey);
  };

  return (
    <Button 
      type="button" 
      variant="outline" 
      onClick={handleTest}
      disabled={testing || !apiUrl || !apiKey}
      className="w-full"
    >
      {testing ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Testando conexão...
        </>
      ) : (
        <>
          <Wifi className="h-4 w-4 mr-2" />
          Testar Conexão
        </>
      )}
    </Button>
  );
};

export default ConnectionTestButton;
