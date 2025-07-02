
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  Download,
  Clock,
  Shield,
  Activity,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SecurityLogs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const logs = [
    {
      id: 1,
      timestamp: "2024-07-02 14:32:15",
      level: "critical",
      category: "firewall",
      message: "Tentativa de acesso não autorizado bloqueada",
      source: "192.168.1.45",
      destination: "192.168.1.1",
      action: "blocked",
      details: "SSH brute force attack detected from external IP"
    },
    {
      id: 2,
      timestamp: "2024-07-02 14:30:42",
      level: "warning",
      category: "intrusion",
      message: "Padrão de tráfego suspeito detectado",
      source: "192.168.1.67",
      destination: "external",
      action: "monitored",
      details: "Unusual outbound traffic pattern detected"
    },
    {
      id: 3,
      timestamp: "2024-07-02 14:28:33",
      level: "info",
      category: "authentication",
      message: "Login bem-sucedido no sistema",
      source: "192.168.1.89",
      destination: "controller",
      action: "allowed",
      details: "User admin successfully authenticated"
    },
    {
      id: 4,
      timestamp: "2024-07-02 14:25:18",
      level: "error",
      category: "vpn",
      message: "Falha na conexão VPN",
      source: "192.168.1.123",
      destination: "vpn-server",
      action: "failed",
      details: "VPN connection failed due to certificate mismatch"
    },
    {
      id: 5,
      timestamp: "2024-07-02 14:22:07",
      level: "warning",
      category: "bandwidth",
      message: "Limite de banda excedido",
      source: "192.168.1.156",
      destination: "wan",
      action: "throttled",
      details: "User exceeded bandwidth quota, connection throttled"
    },
    {
      id: 6,
      timestamp: "2024-07-02 14:20:45",
      level: "info",
      category: "system",
      message: "Backup automático concluído",
      source: "system",
      destination: "backup-server",
      action: "completed",
      details: "Daily configuration backup completed successfully"
    },
    {
      id: 7,
      timestamp: "2024-07-02 14:18:22",
      level: "critical",
      category: "malware",
      message: "Malware detectado e removido",
      source: "192.168.1.78",
      destination: "quarantine",
      action: "quarantined",
      details: "Trojan.Win32.Agent detected and quarantined"
    },
    {
      id: 8,
      timestamp: "2024-07-02 14:15:11",
      level: "warning",
      category: "device",
      message: "Dispositivo não reconhecido conectado",
      source: "unknown-device",
      destination: "network",
      action: "monitored",
      details: "New device with MAC aa:bb:cc:dd:ee:ff connected to network"
    }
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLevel = filterLevel === "all" || log.level === filterLevel;
    const matchesCategory = filterCategory === "all" || log.category === filterCategory;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const getLevelBadge = (level: string) => {
    const variants = {
      critical: { variant: "destructive", icon: XCircle },
      error: { variant: "destructive", icon: AlertTriangle },
      warning: { variant: "default", icon: AlertTriangle },
      info: { variant: "secondary", icon: Info }
    };
    
    const config = variants[level as keyof typeof variants];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant as any} className="flex items-center space-x-1">
        <Icon className="h-3 w-3" />
        <span>{level.toUpperCase()}</span>
      </Badge>
    );
  };

  const getActionBadge = (action: string) => {
    const variants = {
      blocked: { color: "bg-red-500", text: "Bloqueado" },
      allowed: { color: "bg-green-500", text: "Permitido" },
      monitored: { color: "bg-blue-500", text: "Monitorado" },
      failed: { color: "bg-red-500", text: "Falhou" },
      throttled: { color: "bg-orange-500", text: "Limitado" },
      completed: { color: "bg-green-500", text: "Concluído" },
      quarantined: { color: "bg-purple-500", text: "Quarentena" }
    };
    
    const config = variants[action as keyof typeof variants] || { color: "bg-gray-500", text: action };
    
    return (
      <div className="flex items-center space-x-2">
        <div className={`w-2 h-2 rounded-full ${config.color}`} />
        <span className="text-sm">{config.text}</span>
      </div>
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      firewall: Shield,
      intrusion: AlertTriangle,
      authentication: CheckCircle,
      vpn: Activity,
      bandwidth: Activity,
      system: Activity,
      malware: Ban,
      device: Activity
    };
    
    const Icon = icons[category as keyof typeof icons] || Activity;
    return <Icon className="h-4 w-4" />;
  };

  const logStats = {
    total: logs.length,
    critical: logs.filter(l => l.level === 'critical').length,
    warning: logs.filter(l => l.level === 'warning').length,
    info: logs.filter(l => l.level === 'info').length
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <span>Logs de Segurança e Sistema</span>
          </CardTitle>
          <CardDescription>
            Monitore eventos de segurança, alertas e atividades do sistema em tempo real
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-1 space-x-4 w-full sm:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar logs por mensagem, origem ou detalhes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="critical">Crítico</SelectItem>
                  <SelectItem value="error">Erro</SelectItem>
                  <SelectItem value="warning">Aviso</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="firewall">Firewall</SelectItem>
                  <SelectItem value="intrusion">Intrusão</SelectItem>
                  <SelectItem value="authentication">Auth</SelectItem>
                  <SelectItem value="vpn">VPN</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
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
                <p className="text-sm text-muted-foreground">Total de Logs</p>
                <p className="text-2xl font-bold">{logStats.total}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Críticos</p>
                <p className="text-2xl font-bold text-red-600">{logStats.critical}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avisos</p>
                <p className="text-2xl font-bold text-orange-600">{logStats.warning}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Informativos</p>
                <p className="text-2xl font-bold text-green-600">{logStats.info}</p>
              </div>
              <Info className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Logs Table */}
      <Card className="glass-effect">
        <CardHeader>
          <CardTitle>Eventos Recentes ({filteredLogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-lg border bg-card hover:shadow-md transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-start">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-muted">
                      {getCategoryIcon(log.category)}
                    </div>
                    <div>
                      <p className="font-medium">{log.message}</p>
                      <p className="text-sm text-muted-foreground capitalize">{log.category}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Origem</p>
                    <p className="text-sm text-muted-foreground">{log.source}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium">Destino</p>
                    <p className="text-sm text-muted-foreground">{log.destination}</p>
                  </div>
                  
                  <div>
                    {getLevelBadge(log.level)}
                  </div>
                  
                  <div>
                    {getActionBadge(log.action)}
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{log.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t">
                  <p className="text-sm text-muted-foreground">{log.details}</p>
                </div>
              </div>
            ))}
          </div>
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum log encontrado com os filtros aplicados</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityLogs;
