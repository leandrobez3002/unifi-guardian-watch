
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  RefreshCw, 
  Wifi, 
  Server,
  Bell,
  User,
  Moon,
  Sun
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useFirewall } from "@/contexts/FirewallContext";
import { Link } from "react-router-dom";

const UnifiHeader = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { toast } = useToast();
  const { activeFirewall } = useFirewall();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simular chamada da API
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Dados atualizados",
        description: "Os dados do firewall foram atualizados com sucesso.",
      });
    }, 2000);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="p-2 rounded-lg unifi-gradient">
                <Wifi className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">UniFi Control</h2>
                <div className="flex items-center space-x-2">
                  {activeFirewall ? (
                    <>
                      <Badge variant="outline" className="text-xs">
                        {activeFirewall.type === 'UDM' ? (
                          <Server className="h-3 w-3 mr-1" />
                        ) : (
                          <Wifi className="h-3 w-3 mr-1" />
                        )}
                        {activeFirewall.name}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          activeFirewall.status === 'online' 
                            ? 'text-green-600 border-green-200' 
                            : 'text-gray-600 border-gray-200'
                        }`}
                      >
                        {activeFirewall.status === 'online' ? 'Online' : 'Offline'}
                      </Badge>
                    </>
                  ) : (
                    <Badge variant="outline" className="text-xs text-orange-600 border-orange-200">
                      Nenhum firewall configurado
                    </Badge>
                  )}
                </div>
              </div>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center space-x-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Atualizar</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="flex items-center space-x-2"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>

            <Link to="/settings">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>

            <Button variant="outline" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UnifiHeader;
