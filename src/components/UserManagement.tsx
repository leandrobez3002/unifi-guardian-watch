
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, UserPlus, Users, Shield, User } from "lucide-react";

const UserManagement = () => {
  const { users, user: currentUser, addUser, removeUser, updateUser } = useAuth();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user' as 'admin' | 'user'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingUser) {
      updateUser(editingUser, formData);
      toast({
        title: "Usuário atualizado",
        description: `${formData.name} foi atualizado com sucesso.`,
      });
    } else {
      addUser(formData);
      toast({
        title: "Usuário adicionado",
        description: `${formData.name} foi adicionado com sucesso.`,
      });
    }
    
    setFormData({ name: '', email: '', role: 'user' });
    setEditingUser(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (userId: string) => {
    const userToEdit = users.find(u => u.id === userId);
    if (userToEdit) {
      setFormData({
        name: userToEdit.name,
        email: userToEdit.email,
        role: userToEdit.role
      });
      setEditingUser(userId);
      setIsDialogOpen(true);
    }
  };

  const handleRemove = (userId: string, userName: string) => {
    if (userId === currentUser?.id) {
      toast({
        title: "Erro",
        description: "Você não pode remover sua própria conta.",
        variant: "destructive"
      });
      return;
    }

    if (confirm(`Tem certeza que deseja remover o usuário "${userName}"?`)) {
      removeUser(userId);
      toast({
        title: "Usuário removido",
        description: `${userName} foi removido com sucesso.`,
      });
    }
  };

  const getRoleBadge = (role: string) => {
    return role === 'admin' ? (
      <Badge variant="outline" className="text-blue-600 border-blue-200">
        <Shield className="h-3 w-3 mr-1" />
        Admin
      </Badge>
    ) : (
      <Badge variant="outline" className="text-gray-600 border-gray-200">
        <User className="h-3 w-3 mr-1" />
        Usuário
      </Badge>
    );
  };

  // Verificar se o usuário atual é admin
  const isCurrentUserAdmin = currentUser?.role === 'admin';

  if (!isCurrentUserAdmin) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">Acesso Restrito</h3>
          <p className="text-muted-foreground">
            Apenas administradores podem gerenciar usuários.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gerenciamento de Usuários</CardTitle>
          <CardDescription>
            Gerencie os usuários do sistema
          </CardDescription>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={() => {
                setFormData({ name: '', email: '', role: 'user' });
                setEditingUser(null);
              }}
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Adicionar Usuário
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingUser ? 'Editar Usuário' : 'Adicionar Usuário'}
              </DialogTitle>
              <DialogDescription>
                {editingUser ? 'Atualize as informações do usuário' : 'Preencha os dados do novo usuário'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Função</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value: 'admin' | 'user') => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Usuário</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingUser ? 'Atualizar' : 'Adicionar'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <Card key={user.id} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-unifi-blue/10">
                    <User className="h-5 w-5 text-unifi-blue" />
                  </div>
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      {getRoleBadge(user.role)}
                      {user.id === currentUser?.id && (
                        <Badge className="bg-green-100 text-green-800">Você</Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right text-sm text-muted-foreground">
                    <div>Criado: {user.createdAt.toLocaleDateString()}</div>
                    {user.lastLogin && (
                      <div>Último login: {user.lastLogin.toLocaleDateString()}</div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(user.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemove(user.id, user.name)}
                    disabled={user.id === currentUser?.id}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;
