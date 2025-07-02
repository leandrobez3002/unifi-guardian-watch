
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Settings } from "lucide-react";
import { useFirewall, Firewall } from "@/contexts/FirewallContext";
import { useToast } from "@/hooks/use-toast";

interface FirewallFormProps {
  firewall?: Firewall;
  trigger?: React.ReactNode;
}

const FirewallForm: React.FC<FirewallFormProps> = ({ firewall, trigger }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: firewall?.name || '',
    apiUrl: firewall?.apiUrl || '',
    type: firewall?.type || 'UDM' as 'UDM' | 'UCG',
  });
  
  const { addFirewall, updateFirewall } = useFirewall();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.apiUrl) {
      toast({
        title: "Erro",
        description: "Nome e URL da API são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      new URL(formData.apiUrl);
    } catch {
      toast({
        title: "Erro",
        description: "URL da API inválida.",
        variant: "destructive",
      });
      return;
    }

    if (firewall) {
      updateFirewall(firewall.id, formData);
      toast({
        title: "Sucesso",
        description: "Firewall atualizado com sucesso.",
      });
    } else {
      addFirewall(formData);
      toast({
        title: "Sucesso",
        description: "Firewall adicionado com sucesso.",
      });
    }

    setOpen(false);
    setFormData({ name: '', apiUrl: '', type: 'UDM' });
  };

  const defaultTrigger = (
    <Button variant="outline" size="sm">
      <Plus className="h-4 w-4 mr-2" />
      Adicionar Firewall
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {firewall ? 'Editar Firewall' : 'Adicionar Firewall'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Firewall</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Firewall Principal"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apiUrl">URL da API</Label>
            <Input
              id="apiUrl"
              type="url"
              value={formData.apiUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, apiUrl: e.target.value }))}
              placeholder="https://192.168.1.1:8443"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Tipo do Dispositivo</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value: 'UDM' | 'UCG') => 
                setFormData(prev => ({ ...prev, type: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UDM">UDM (UniFi Dream Machine)</SelectItem>
                <SelectItem value="UCG">UCG (UniFi Cloud Gateway)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {firewall ? 'Atualizar' : 'Adicionar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FirewallForm;
