
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, AlertCircle, CheckCircle, Search } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { toast } from '@/hooks/use-toast';

const OpportunityForm = ({ opportunity, user, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    clientName: '',
    clientDocument: '',
    value: '',
    stage: 'Prospecção',
    probability: '50',
    expectedDate: null,
    responsible: user.name,
    sector: user.sector,
    description: '',
    requirements: '',
    competitors: '',
    nextAction: '',
    nextActionDate: null
  });

  const [clientCheck, setClientCheck] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (opportunity) {
      setFormData({
        title: opportunity.title || '',
        clientName: opportunity.clientName || '',
        clientDocument: opportunity.clientDocument || '',
        value: opportunity.value?.toString() || '',
        stage: opportunity.stage || 'Prospecção',
        probability: opportunity.probability?.toString() || '50',
        expectedDate: opportunity.expectedDate ? new Date(opportunity.expectedDate) : null,
        responsible: opportunity.responsible || user.name,
        sector: opportunity.sector || user.sector,
        description: opportunity.description || '',
        requirements: opportunity.requirements || '',
        competitors: opportunity.competitors || '',
        nextAction: opportunity.nextAction || '',
        nextActionDate: opportunity.nextActionDate ? new Date(opportunity.nextActionDate) : null
      });
    }
  }, [opportunity, user]);

  // Simular verificação de cliente na base
  const checkClientInBase = (document) => {
    if (!document || document.length < 11) {
      setClientCheck(null);
      return;
    }

    const existingClients = [
      { document: '12.345.678/0001-90', name: 'Empresa ABC Ltda' },
      { document: '123.456.789-00', name: 'João Silva Santos' },
      { document: '98.765.432/0001-10', name: 'TechSolutions Corp' }
    ];

    const foundClient = existingClients.find(c => c.document === document);
    
    if (foundClient) {
      setClientCheck({
        exists: true,
        clientName: foundClient.name,
        message: 'Cliente já cadastrado na base'
      });
      setFormData(prev => ({ ...prev, clientName: foundClient.name }));
    } else {
      setClientCheck({
        exists: false,
        message: 'Novo cliente - não encontrado na base'
      });
    }
  };

  const formatDocument = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else {
      return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
  };

  const handleDocumentChange = (value) => {
    const formatted = formatDocument(value);
    setFormData({ ...formData, clientDocument: formatted });
    checkClientInBase(formatted);
  };

  const formatCurrency = (value) => {
    const numbers = value.replace(/\D/g, '');
    const amount = parseInt(numbers) / 100;
    return amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };

  const handleValueChange = (value) => {
    const formatted = formatCurrency(value);
    setFormData({ ...formData, value: formatted });
  };

  const stages = [
    'Prospecção',
    'Qualificação', 
    'Proposta',
    'Negociação',
    'Fechado',
    'Perdido'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulação de salvamento
    setTimeout(() => {
      toast({
        title: opportunity ? "Oportunidade atualizada!" : "Oportunidade criada!",
        description: `${formData.title} foi ${opportunity ? 'atualizada' : 'criada'} com sucesso.`,
      });
      setLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Identificação automática do setor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Identificação da Oportunidade
          </CardTitle>
          <CardDescription>
            O setor {user.sector} será automaticamente identificado para esta oportunidade
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="sector">Setor (Identificação Automática)</Label>
            <Input
              id="sector"
              value={formData.sector}
              disabled
              className="bg-blue-50 border-blue-200"
            />
            <p className="text-xs text-blue-600 mt-1">
              Setor identificado automaticamente com base no seu login
            </p>
          </div>

          <div>
            <Label htmlFor="responsible">Responsável</Label>
            <Input
              id="responsible"
              value={formData.responsible}
              onChange={(e) => setFormData({ ...formData, responsible: e.target.value })}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Verificação de cliente */}
      <Card>
        <CardHeader>
          <CardTitle>Identificação do Cliente</CardTitle>
          <CardDescription>Verifique se o cliente já está cadastrado na base</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="clientDocument">CPF/CNPJ do Cliente</Label>
            <Input
              id="clientDocument"
              value={formData.clientDocument}
              onChange={(e) => handleDocumentChange(e.target.value)}
              placeholder="000.000.000-00 ou 00.000.000/0000-00"
              required
            />
          </div>

          {/* Status da verificação */}
          {clientCheck && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              clientCheck.exists 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-orange-50 border border-orange-200'
            }`}>
              {clientCheck.exists ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-600" />
              )}
              <div>
                <p className={`font-medium ${
                  clientCheck.exists ? 'text-green-800' : 'text-orange-800'
                }`}>
                  {clientCheck.message}
                </p>
                {clientCheck.exists && (
                  <p className="text-sm text-green-600">
                    Cliente: {clientCheck.clientName}
                  </p>
                )}
              </div>
              {clientCheck.exists && (
                <Badge variant="outline" className="ml-auto text-green-600 border-green-200">
                  Cliente da Base
                </Badge>
              )}
            </div>
          )}

          <div>
            <Label htmlFor="clientName">Nome do Cliente</Label>
            <Input
              id="clientName"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Dados da oportunidade */}
      <Card>
        <CardHeader>
          <CardTitle>Dados da Oportunidade</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Título da Oportunidade</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Expansão de Serviços - Nome do Cliente"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="value">Valor da Oportunidade (R$)</Label>
              <Input
                id="value"
                value={formData.value}
                onChange={(e) => handleValueChange(e.target.value)}
                placeholder="0,00"
                required
              />
            </div>
            <div>
              <Label htmlFor="probability">Probabilidade de Fechamento (%)</Label>
              <Select value={formData.probability} onValueChange={(value) => setFormData({ ...formData, probability: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10% - Muito baixa</SelectItem>
                  <SelectItem value="25">25% - Baixa</SelectItem>
                  <SelectItem value="50">50% - Média</SelectItem>
                  <SelectItem value="75">75% - Alta</SelectItem>
                  <SelectItem value="90">90% - Muito alta</SelectItem>
                  <SelectItem value="100">100% - Certa</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stage">Etapa do Pipeline</Label>
              <Select value={formData.stage} onValueChange={(value) => setFormData({ ...formData, stage: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {stages.map(stage => (
                    <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Data Prevista de Fechamento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.expectedDate ? format(formData.expectedDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.expectedDate}
                    onSelect={(date) => setFormData({ ...formData, expectedDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detalhes da negociação */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Negociação</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="description">Descrição da Oportunidade</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva brevemente a oportunidade e o contexto"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="requirements">Requisitos e Necessidades do Cliente</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="Liste os principais requisitos e necessidades identificadas"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="competitors">Concorrência Identificada</Label>
            <Input
              id="competitors"
              value={formData.competitors}
              onChange={(e) => setFormData({ ...formData, competitors: e.target.value })}
              placeholder="Ex: Concorrente A, Concorrente B, Nenhum"
            />
          </div>
        </CardContent>
      </Card>

      {/* Próximas ações */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Ações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="nextAction">Próxima Ação</Label>
            <Input
              id="nextAction"
              value={formData.nextAction}
              onChange={(e) => setFormData({ ...formData, nextAction: e.target.value })}
              placeholder="Ex: Agendar reunião, Enviar proposta, Aguardar retorno"
            />
          </div>

          <div>
            <Label>Data da Próxima Ação</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.nextActionDate ? format(formData.nextActionDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.nextActionDate}
                  onSelect={(date) => setFormData({ ...formData, nextActionDate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Botões */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" className="flex-1" disabled={loading}>
          {loading ? 'Salvando...' : (opportunity ? 'Atualizar Oportunidade' : 'Criar Oportunidade')}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};

export default OpportunityForm;
