
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, 
  Users, 
  Shield,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Activity,
  Clock
} from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import UserForm from './UserForm';

const AdminPanel = ({ user }) => {
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Dados simulados de usuários
  const mockUsers = [
    {
      id: 1,
      name: 'Carlos Silva',
      email: 'gerente@empresa.com',
      role: 'Gerente Comercial',
      sector: 'Comercial',
      status: 'Ativo',
      lastLogin: '2024-06-18 09:15',
      permissions: ['dashboard', 'clientes', 'contratos', 'oportunidades', 'relatorios', 'admin'],
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Ana Santos',
      email: 'analista@empresa.com',
      role: 'Analista Comercial',
      sector: 'Comercial',
      status: 'Ativo',
      lastLogin: '2024-06-18 08:45',
      permissions: ['dashboard', 'clientes', 'contratos', 'oportunidades'],
      createdAt: '2024-02-01'
    },
    {
      id: 3,
      name: 'Pedro Costa',
      email: 'suporte@empresa.com',
      role: 'Analista de Suporte',
      sector: 'Suporte',
      status: 'Ativo',
      lastLogin: '2024-06-17 16:30',
      permissions: ['dashboard', 'clientes'],
      createdAt: '2024-03-10'
    },
    {
      id: 4,
      name: 'Maria Oliveira',
      email: 'comercial2@empresa.com',
      role: 'Analista Comercial',
      sector: 'Comercial',
      status: 'Inativo',
      lastLogin: '2024-06-10 14:20',
      permissions: ['dashboard', 'clientes', 'oportunidades'],
      createdAt: '2024-01-20'
    }
  ];

  // Dados simulados de logs de auditoria
  const mockAuditLogs = [
    {
      id: 1,
      user: 'Carlos Silva',
      action: 'Login realizado',
      details: 'Acesso ao sistema via web',
      timestamp: '2024-06-18 09:15:23',
      ip: '192.168.1.100',
      status: 'Sucesso'
    },
    {
      id: 2,
      user: 'Ana Santos',
      action: 'Cliente criado',
      details: 'Novo cliente: TechSolutions Corp',
      timestamp: '2024-06-18 08:50:15',
      ip: '192.168.1.105',
      status: 'Sucesso'
    },
    {
      id: 3,
      user: 'Pedro Costa',
      action: 'Tentativa de acesso negado',
      details: 'Tentativa de acesso à seção Contratos',
      timestamp: '2024-06-17 16:35:45',
      ip: '192.168.1.110',
      status: 'Bloqueado'
    },
    {
      id: 4,
      user: 'Carlos Silva',
      action: 'Relatório exportado',
      details: 'Pipeline de vendas - PDF',
      timestamp: '2024-06-17 15:20:30',
      ip: '192.168.1.100',
      status: 'Sucesso'
    },
    {
      id: 5,
      user: 'Ana Santos',
      action: 'Oportunidade atualizada',
      details: 'Expansão de Serviços - ABC Ltda',
      timestamp: '2024-06-17 14:10:18',
      ip: '192.168.1.105',
      status: 'Sucesso'
    }
  ];

  const filteredUsers = mockUsers.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewUser = () => {
    setSelectedUser(null);
    setShowUserForm(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowUserForm(true);
  };

  const handleDeleteUser = (userId) => {
    if (confirm('Tem certeza que deseja desativar este usuário?')) {
      // Simulação de desativação
      alert('Usuário desativado com sucesso!');
    }
  };

  const renderUsersTab = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestão de Usuários</h2>
          <p className="text-gray-600 mt-1">
            {filteredUsers.length} usuários encontrados
          </p>
        </div>
        <Button onClick={handleNewUser} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Novo Usuário
        </Button>
      </div>

      {/* Busca */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome, email ou cargo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Lista de usuários */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {user.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={user.status === 'Ativo' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                        <Badge variant="outline">{user.role}</Badge>
                        <Badge variant="outline">{user.sector}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Último Acesso</p>
                      <p className="text-gray-600">{user.lastLogin}</p>
                    </div>
                    <div>
                      <p className="font-medium">Permissões</p>
                      <p className="text-gray-600">{user.permissions.length} módulos</p>
                    </div>
                    <div>
                      <p className="font-medium">Cadastrado em</p>
                      <p className="text-gray-600">{new Date(user.createdAt).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {user.permissions.map(permission => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditUser(user)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={user.id === 1} // Não pode deletar admin
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderPermissionsTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Controle de Permissões</h2>
        <p className="text-gray-600 mt-1">
          Gerencie permissões e acessos por perfil de usuário
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Perfil Gerente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Gerente Comercial
            </CardTitle>
            <CardDescription>Acesso completo ao sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge className="w-full justify-center">Dashboard</Badge>
              <Badge className="w-full justify-center">Clientes</Badge>
              <Badge className="w-full justify-center">Contratos</Badge>
              <Badge className="w-full justify-center">Oportunidades</Badge>
              <Badge className="w-full justify-center">Relatórios</Badge>
              <Badge className="w-full justify-center">Administração</Badge>
            </div>
            <Button className="w-full mt-4" variant="outline">
              Editar Permissões
            </Button>
          </CardContent>
        </Card>

        {/* Perfil Analista */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Analista Comercial
            </CardTitle>
            <CardDescription>Acesso limitado ao comercial</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge className="w-full justify-center">Dashboard</Badge>
              <Badge className="w-full justify-center">Clientes</Badge>
              <Badge className="w-full justify-center">Contratos</Badge>
              <Badge className="w-full justify-center">Oportunidades</Badge>
              <Badge variant="secondary" className="w-full justify-center">Relatórios</Badge>
              <Badge variant="secondary" className="w-full justify-center">Administração</Badge>
            </div>
            <Button className="w-full mt-4" variant="outline">
              Editar Permissões
            </Button>
          </CardContent>
        </Card>

        {/* Perfil Suporte */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-yellow-600" />
              Analista de Suporte
            </CardTitle>
            <CardDescription>Acesso básico para suporte</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Badge className="w-full justify-center">Dashboard</Badge>
              <Badge className="w-full justify-center">Clientes</Badge>
              <Badge variant="secondary" className="w-full justify-center">Contratos</Badge>
              <Badge variant="secondary" className="w-full justify-center">Oportunidades</Badge>
              <Badge variant="secondary" className="w-full justify-center">Relatórios</Badge>
              <Badge variant="secondary" className="w-full justify-center">Administração</Badge>
            </div>
            <Button className="w-full mt-4" variant="outline">
              Editar Permissões
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAuditTab = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Auditoria e Logs</h2>
        <p className="text-gray-600 mt-1">
          Histórico de ações e acessos no sistema
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Logs de Auditoria</CardTitle>
          <CardDescription>Últimas ações realizadas no sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockAuditLogs.map((log) => (
              <div key={log.id} className="border rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{log.action}</span>
                      <Badge variant={log.status === 'Sucesso' ? 'default' : 'destructive'}>
                        {log.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{log.details}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span>Usuário: {log.user}</span>
                      <span>IP: {log.ip}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{log.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'users':
        return renderUsersTab();
      case 'permissions':
        return renderPermissionsTab();
      case 'audit':
        return renderAuditTab();
      default:
        return renderUsersTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Painel de Administração</h1>
        <p className="text-gray-600 mt-1">
          Gerencie usuários, permissões e monitore atividades do sistema
        </p>
      </div>

      {/* Tabs */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 border-b">
            <button
              onClick={() => setActiveTab('users')}
              className={`pb-2 px-1 font-medium ${
                activeTab === 'users'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Usuários
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`pb-2 px-1 font-medium ${
                activeTab === 'permissions'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Shield className="w-4 h-4 inline mr-2" />
              Permissões
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`pb-2 px-1 font-medium ${
                activeTab === 'audit'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Activity className="w-4 h-4 inline mr-2" />
              Auditoria
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Conteúdo da tab */}
      {renderTabContent()}

      {/* Formulário de usuário */}
      <Dialog open={showUserForm} onOpenChange={setShowUserForm}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedUser ? 'Editar Usuário' : 'Novo Usuário'}
            </DialogTitle>
            <DialogDescription>
              {selectedUser 
                ? 'Atualize as informações e permissões do usuário'
                : 'Cadastre um novo usuário no sistema'
              }
            </DialogDescription>
          </DialogHeader>
          <UserForm 
            user={selectedUser}
            onClose={() => setShowUserForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
