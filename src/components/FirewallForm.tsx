
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useFirewall, Firewall } from "@/contexts/FirewallContext";
import { useToast } from "@/hooks/use-toast";
import { useFirewallForm } from "@/hooks/useFirewallForm";
import ConnectionTestButton from "@/components/ConnectionTestButton";

interface FirewallFormProps {
  firewall?: Firewall;
  trigger?: React.ReactNode;
}

const FirewallForm: React.FC<FirewallFormProps> = ({ firewall, trigger }) => {
  const [open, setOpen] = useState(false);
  const { addFirewall, updateFirewall } = useFirewall();
  const { toast } = useToast();
  const { formData, updateFormData, resetForm, validateForm, formatApiUrl } = useFirewallForm(firewall);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateForm();
    if (!validation.isValid) {
      toast({
        title: "Erro",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    const firewallData = {
      ...formData,
      apiUrl: formatApiUrl(formData.apiUrl)
    };

    if (firewall) {
      updateFirewall(firewall.id, firewallData);
      toast({
        title: "Sucesso",
        description: "Firewall atualizado com sucesso.",
      });
    } else {
      addFirewall(firewallData);
      toast({
        title: "Sucesso",
        description: "Firewall adicionado com sucesso.",
      });
    }

    setOpen(false);
    resetForm();
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
              onChange={(e) => updateFormData('name', e.target.value)}
              placeholder="Ex: Firewall Principal"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apiUrl">URL Base da API</Label>
            <Input
              id="apiUrl"
              type="url"
              value={formData.apiUrl}
              onChange={(e) => updateFormData('apiUrl', e.target.value)}
              placeholder="https://192.168.108.1"
              required
            />
            <p className="text-xs text-muted-foreground">
              URL base do dispositivo (ex: https://192.168.108.1)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={formData.apiKey}
              onChange={(e) => updateFormData('apiKey', e.target.value)}
              placeholder="YOUR_API_KEY"
              required
            />
            <p className="text-xs text-muted-foreground">
              Chave de API gerada no painel do UniFi
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Tipo do Dispositivo</Label>
            <Select 
              value={formData.type} 
              onValueChange={(value: 'UDM' | 'UCG') => updateFormData('type', value)}
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

          <div className="flex justify-center pt-2">
            <ConnectionTestButton 
              apiUrl={formData.apiUrl} 
              apiKey={formData.apiKey} 
            />
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
