
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  AlertTriangle, 
  Activity, 
  Network, 
  Settings,
  Search,
  Filter,
  RefreshCw,
  Download,
  TrendingUp,
  TrendingDown,
  Clock,
  MapPin,
  Smartphone,
  Laptop,
  Server,
  Wifi
} from "lucide-react";
import DashboardOverview from "@/components/DashboardOverview";
import UserAccessReports from "@/components/UserAccessReports";
import BlockingReports from "@/components/BlockingReports";
import NetworkTraffic from "@/components/NetworkTraffic";
import SecurityLogs from "@/components/SecurityLogs";
import UnifiHeader from "@/components/UnifiHeader";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <UnifiHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-unifi-blue to-unifi-blue-light bg-clip-text text-transparent">
            Sistema de Monitoramento UniFi
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Monitore e analise o tráfego de rede dos seus dispositivos UDM e UCG
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-5 glass-effect">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="blocks" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Bloqueios
            </TabsTrigger>
            <TabsTrigger value="traffic" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              Tráfego
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Logs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-slide-up">
            <DashboardOverview />
          </TabsContent>

          <TabsContent value="users" className="space-y-6 animate-slide-up">
            <UserAccessReports />
          </TabsContent>

          <TabsContent value="blocks" className="space-y-6 animate-slide-up">
            <BlockingReports />
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6 animate-slide-up">
            <NetworkTraffic />
          </TabsContent>

          <TabsContent value="logs" className="space-y-6 animate-slide-up">
            <SecurityLogs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
