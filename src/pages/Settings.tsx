
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Wifi, Server, AlertCircle, CheckCircle } from "lucide-react";
import { useFirewall } from "@/contexts/FirewallContext";
import FirewallForm from "@/components/FirewallForm";
import UnifiHeader from "@/components/UnifiHeader";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { firewalls, activeFirewall, removeFirewall, setActiveFirewall } = useFirewall();
  const { toast } = useToast();

  const handleRemove = (id: string, name: string) => {
    if (confirm(`Tem certeza que deseja remover o firewall "${name}"?`)) {
      removeFirewall(id);
      toast({
        title: "Firewall removido",
        description: `O firewall "${name}" foi removido com sucesso.`,
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'online':
        return <Badge variant="outline" className="text-green-600 border-green-200">Online</Badge>;
      case 'error':
        return <Badge variant="outline" className="text-red-600 border-red-200">Erro</Badge>;
      default:
        return <Badge variant="outline" className="text-gray-600 border-gray-200">Offline</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <UnifiHeader />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-unifi-blue to-unifi-blue-light bg-clip-text text-transparent">
            Configurações do Sistema
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Gerencie seus firewalls UniFi e configurações da API
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Firewalls Configurados</CardTitle>
                <CardDescription>
                  Gerencie os firewalls UDM e UCG conectados ao sistema
                </CardDescription>
              </div>
              <FirewallForm />
            </CardHeader>
            <CardContent>
              {firewalls.length === 0 ? (
                <div className="text-center py-8">
                  <Server className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhum firewall configurado</h3>
                  <p className="text-muted-foreground mb-4">
                    Adicione seu primeiro firewall para começar a monitorar
                  </p>
                  <FirewallForm />
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {firewalls.map((firewall) => (
                    <Card 
                      key={firewall.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        activeFirewall?.id === firewall.id 
                          ? 'ring-2 ring-unifi-blue border-unifi-blue' 
                          : ''
                      }`}
                      onClick={() => setActiveFirewall(firewall)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            {firewall.type === 'UDM' ? (
                              <Server className="h-5 w-5 text-unifi-blue" />
                            ) : (
                              <Wifi className="h-5 w-5 text-unifi-blue" />
                            )}
                            <CardTitle className="text-lg">{firewall.name}</CardTitle>
                          </div>
                          {getStatusIcon(firewall.status)}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">{firewall.type}</Badge>
                          {getStatusBadge(firewall.status)}
                          {activeFirewall?.id === firewall.id && (
                            <Badge className="bg-unifi-blue">Ativo</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">
                            <strong>API:</strong> {firewall.apiUrl}
                          </div>
                          {firewall.lastUpdated && (
                            <div className="text-xs text-muted-foreground">
                              Última atualização: {firewall.lastUpdated.toLocaleString()}
                            </div>
                          )}
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          <FirewallForm 
                            firewall={firewall}
                            trigger={
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            }
                          />
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemove(firewall.id, firewall.name);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
