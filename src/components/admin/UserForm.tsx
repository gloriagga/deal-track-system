
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Shield, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const UserForm = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    sector: '',
    status: 'Ativo',
    permissions: []
  });

  const [loading, setLoading] = useState(false);

  const availablePermissions = [
    { id: 'dashboard', name: 'Dashboard', description: 'Acesso ao painel principal' },
    { id: 'clientes', name: 'Clientes', description: 'Gestão de clientes' },
    { id: 'contratos', name: 'Contratos', description: 'Gestão de contratos' },
    { id: 'oportunidades', name: 'Oportunidades', description: 'Pipeline de vendas' },
    { id: 'relatorios', name: 'Relatórios', description: 'Análises e relatórios' },
    { id: 'admin', name: 'Administração', description: 'Configurações do sistema' }
  ];

  const roles = [
    'Gerente Comercial',
    'Analista Comercial',
    'Analista de Suporte',
    'Coordenador',
    'Diretor'
  ];

  const sectors = [
    'Comercial',
    'Suporte',
    'Financeiro',
    'Operações',
    'RH'
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: '',
        role: user.role || '',
        sector: user.sector || '',
        status: user.status || 'Ativo',
        permissions: user.permissions || []
      });
    }
  }, [user]);

  const handlePermissionChange = (permissionId, checked) => {
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permissionId]
      });
    } else {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter(p => p !== permissionId)
      });
    }
  };

  const applyRolePreset = (role) => {
    let permissions = [];
    
    switch (role) {
      case 'Gerente Comercial':
        permissions = ['dashboard', 'clientes', 'contratos', 'oportunidades', 'relatorios', 'admin'];
        break;
      case 'Analista Comercial':
        permissions = ['dashboard', 'clientes', 'contratos', 'oportunidades'];
        break;
      case 'Analista de Suporte':
        permissions = ['dashboard', 'clientes'];
        break;
      case 'Coordenador':
        permissions = ['dashboard', 'clientes', 'contratos', 'oportunidades', 'relatorios'];
        break;
      case 'Diretor':
        permissions = ['dashboard', 'clientes', 'contratos', 'oportunidades', 'relatorios', 'admin'];
        break;
      default:
        permissions = ['dashboard'];
    }
    
    setFormData({ ...formData, role, permissions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validações
    if (!user && formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "As senhas não coincidem",
      });
      return;
    }

    if (formData.permissions.length === 0) {
      toast({
        variant: "destructive",
        title: "Erro de validação",
        description: "Selecione pelo menos uma permissão",
      });
      return;
    }

    setLoading(true);

    // Simulação de salvamento
    setTimeout(() => {
      toast({
        title: user ? "Usuário atualizado!" : "Usuário criado!",
        description: `${formData.name} foi ${user ? 'atualizado' : 'criado'} com sucesso.`,
      });
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Dados básicos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Dados do Usuário
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {!user && (
            <>
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  minLength={6}
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="role">Cargo</Label>
              <Select 
                value={formData.role} 
                onValueChange={(value) => applyRolePreset(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o cargo" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role} value={role}>{role}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="sector">Setor</Label>
              <Select 
                value={formData.sector} 
                onValueChange={(value) => setFormData({ ...formData, sector: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o setor" />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map(sector => (
                    <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Permissões */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Permissões de Acesso
          </CardTitle>
          <CardDescription>
            {formData.role && (
              <div className="flex items-center gap-2 mt-2">
                <span>Permissões para:</span>
                <Badge>{formData.role}</Badge>
              </div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availablePermissions.map((permission) => (
              <div key={permission.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                <Checkbox
                  id={permission.id}
                  checked={formData.permissions.includes(permission.id)}
                  onCheckedChange={(checked) => handlePermissionChange(permission.id, checked)}
                />
                <div className="flex-1">
                  <Label 
                    htmlFor={permission.id}
                    className="font-medium cursor-pointer"
                  >
                    {permission.name}
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">
                    {permission.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {formData.permissions.length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-800 mb-2">
                Permissões selecionadas ({formData.permissions.length}):
              </p>
              <div className="flex flex-wrap gap-1">
                {formData.permissions.map(permissionId => {
                  const permission = availablePermissions.find(p => p.id === permissionId);
                  return (
                    <Badge key={permissionId} variant="outline" className="text-blue-600 border-blue-300">
                      {permission?.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Botões */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" className="flex-1" disabled={loading}>
          {loading ? 'Salvando...' : (user ? 'Atualizar Usuário' : 'Criar Usuário')}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default UserForm;
