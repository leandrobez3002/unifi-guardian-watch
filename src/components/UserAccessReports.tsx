
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search, 
  Filter, 
  Download,
  Smartphone,
  Laptop,
  Clock,
  MapPin,
  Wifi,
  Activity
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const UserAccessReports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const users = [
    {
      id: 1,
      name: "João Silva",
      device: "iPhone 14",
      ip: "192.168.1.45",
      mac: "aa:bb:cc:dd:ee:ff",
      status: "online",
      connected: "14:32",
      duration: "2h 15m",
      bandwidth: "45.2 MB/s",
      location: "Sala de Reunião",
      type: "smartphone"
    },
    {
      id: 2,
      name: "Maria Santos",
      device: "MacBook Pro",
      ip: "192.168.1.67",
      mac: "11:22:33:44:55:66",
      status: "online",
      connected: "09:15",
      duration: "5h 47m",
      bandwidth: "120.8 MB/s",
      location: "Escritório",
      type: "laptop"
    },
    {
      id: 3,
      name: "Pedro Costa",
      device: "Samsung Galaxy",
      ip: "192.168.1.89",
      mac: "77:88:99:aa:bb:cc",
      status: "offline",
      connected: "13:20",
      duration: "45m",
      bandwidth: "0 MB/s",
      location: "Recepção",
      type: "smartphone"
    },
    {
      id: 4,
      name: "Ana Oliveira",
      device: "Dell Laptop",
      ip: "192.168.1.123",
      mac: "dd:ee:ff:00:11:22",
      status: "online",
      connected: "10:30",
      duration: "4h 32m",
      bandwidth: "78.5 MB/s",
      location: "Laboratório",
      type: "laptop"
    },
    {
      id: 5,
      name: "Carlos Lima",
      device: "iPad Air",
      ip: "192.168.1.156",
      mac: "33:44:55:66:77:88",
      status: "online",
      connected: "12:45",
      duration: "2h 47m",
      bandwidth: "32.1 MB/s",
      location: "Auditório",
      type: "tablet"
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.ip.includes(searchTerm);
    
    const matchesFilter = filterStatus === "all" || user.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "smartphone":
        return <Smartphone className="h-4 w-4" />;
      case "laptop":
        return <Laptop className="h-4 w-4" />;
      default:
        return <Smartphone className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    return (
      <Badge variant={status === "online" ? "default" : "secondary"}>
        <div className={`w-2 h-2 rounded-full mr-2 ${
          status === "online" ? "bg-green-500 animate-pulse-slow" : "bg-gray-400"
        }`} />
        {status === "online" ? "Online" : "Offline"}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span>Relatórios de Acesso de Usuários</span>
          </CardTitle>
          <CardDescription>
            Monitore conexões, dispositivos e atividade dos usuários em tempo real
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 space-x-4 w-full sm:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por usuário, dispositivo ou IP..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Usuários</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Online Agora</p>
                <p className="text-2xl font-bold text-green-600">
                  {users.filter(u => u.status === "online").length}
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Dispositivos</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <Wifi className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bandwidth Total</p>
                <p className="text-2xl font-bold">276.6 MB/s</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Usuários Conectados ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-muted">
                      {getDeviceIcon(user.type)}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.device}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">{user.ip}</p>
                    <p className="text-xs text-muted-foreground">{user.mac}</p>
                  </div>
                  
                  <div>
                    {getStatusBadge(user.status)}
                  </div>
                  
                  <div className="flex items-center space-x-1 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{user.duration}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{user.location}</span>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium">{user.bandwidth}</p>
                    <p className="text-xs text-muted-foreground">Conectado: {user.connected}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum usuário encontrado com os filtros aplicados</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAccessReports;
