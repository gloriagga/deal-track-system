import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Building2, Mail, Lock, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Usuários simulados com diferentes perfis e setores
  const mockUsers = [
    {
      id: 1,
      email: 'gerente@empresa.com',
      password: '123456',
      name: 'Carlos Silva',
      role: 'Gerente Comercial',
      sector: 'Comercial',
      permissions: ['dashboard', 'clientes', 'contratos', 'oportunidades', 'relatorios', 'admin']
    },
    {
      id: 2,
      email: 'analista@empresa.com',
      password: '123456',
      name: 'Ana Santos',
      role: 'Analista Comercial',
      sector: 'Comercial',
      permissions: ['dashboard', 'clientes', 'contratos', 'oportunidades']
    },
    {
      id: 3,
      email: 'assistente@empresa.com',
      password: '123456',
      name: 'Pedro Costa',
      role: 'Assistente de Suporte',
      sector: 'Suporte',
      permissions: ['dashboard', 'clientes']
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simular API call
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const userData = {
          ...user,
          token: `token_${user.id}_${Date.now()}`
        };
        onLogin(userData);
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo, ${user.name}`,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Erro no login",
          description: "Email ou senha incorretos",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <img 
              src="/lovable-uploads/cc2e3ce4-ff81-4016-9667-6f0a8494a20f.png" 
              alt="Arcus Logo" 
              className="h-20 w-auto"
            />
          </div>
          <p className="text-gray-600 mt-2">Sistema integrado de gestão comercial</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Fazer Login</CardTitle>
            <CardDescription>
              Acesse sua conta para continuar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-sm">Contas de demonstração:</span>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div><strong>Gerente:</strong> gerente@empresa.com / 123456</div>
                <div><strong>Analista:</strong> analista@empresa.com / 123456</div>
                <div><strong>Assistente:</strong> assistente@empresa.com / 123456</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
