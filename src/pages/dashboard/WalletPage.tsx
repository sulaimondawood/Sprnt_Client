import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { RoleBadge } from '@/components/RoleBadge';
import { mockRiderWallet, mockDriverWallet, mockWalletTransactions } from '@/data/mockData';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Plus, 
  CreditCard,
  TrendingUp,
  Clock,
  ChevronRight,
  Gift,
  ArrowRight
} from 'lucide-react';
import { format } from 'date-fns';

const WalletPage = () => {
  const { user } = useAuth();
  const isDriver = user?.role === 'DRIVER';
  const wallet = isDriver ? mockDriverWallet : mockRiderWallet;
  const [topUpAmount, setTopUpAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const quickAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

  const getTransactionIcon = (type: string, reason: string) => {
    if (type === 'CREDIT') {
      if (reason === 'BONUS') return <Gift className="h-5 w-5" />;
      return <ArrowDownLeft className="h-5 w-5" />;
    }
    return <ArrowUpRight className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{isDriver ? 'Earnings' : 'Wallet'}</h1>
            <RoleBadge role={user?.role || 'RIDER'} />
          </div>
          <p className="text-muted-foreground">
            {isDriver ? 'Manage your earnings and withdrawals' : 'Manage your wallet balance'}
          </p>
        </div>
      </div>

      {/* Balance Card */}
      <Card className={`p-8 ${isDriver ? 'gradient-driver' : 'gradient-rider'} text-white relative overflow-hidden`}>
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
        <div className="absolute -right-5 -bottom-10 w-32 h-32 rounded-full bg-white/10" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Wallet className="h-6 w-6" />
            <span className="text-lg opacity-90">
              {isDriver ? 'Total Balance' : 'Wallet Balance'}
            </span>
          </div>
          
          <p className="text-5xl font-bold mb-6">
            {formatCurrency(wallet.balance)}
          </p>
          
          <div className="flex flex-wrap gap-3">
            {isDriver ? (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="gap-2">
                      <ArrowUpRight className="h-4 w-4" />
                      Withdraw
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Withdraw Funds</DialogTitle>
                      <DialogDescription>
                        Enter the amount you want to withdraw to your bank account.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label>Amount (₦)</Label>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[10000, 20000, 50000, 100000].map((amount) => (
                          <Button
                            key={amount}
                            variant="outline"
                            size="sm"
                            onClick={() => setWithdrawAmount(amount.toString())}
                          >
                            {formatCurrency(amount)}
                          </Button>
                        ))}
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Withdrawal to</p>
                        <p className="font-medium">GTBank •••• 1234</p>
                      </div>
                      <Button className="w-full gradient-driver">
                        Withdraw {withdrawAmount && formatCurrency(Number(withdrawAmount))}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" className="gap-2 bg-white/10 border-white/20 hover:bg-white/20">
                  <CreditCard className="h-4 w-4" />
                  Add Bank Account
                </Button>
              </>
            ) : (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary" className="gap-2">
                      <Plus className="h-4 w-4" />
                      Top Up
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Top Up Wallet</DialogTitle>
                      <DialogDescription>
                        Add funds to your wallet for seamless payments.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label>Amount (₦)</Label>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={topUpAmount}
                          onChange={(e) => setTopUpAmount(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {quickAmounts.map((amount) => (
                          <Button
                            key={amount}
                            variant="outline"
                            size="sm"
                            onClick={() => setTopUpAmount(amount.toString())}
                          >
                            {formatCurrency(amount)}
                          </Button>
                        ))}
                      </div>
                      <Button className="w-full gradient-rider">
                        Pay {topUpAmount && formatCurrency(Number(topUpAmount))}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="gap-2 bg-white/10 border-white/20 hover:bg-white/20">
                  <CreditCard className="h-4 w-4" />
                  Add Card
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Quick Stats for Driver */}
      {isDriver && (
        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <span className="text-muted-foreground">Today</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(32500)}</p>
            <p className="text-sm text-success">+15% from yesterday</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-info" />
              </div>
              <span className="text-muted-foreground">This Week</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(187500)}</p>
            <p className="text-sm text-info">45 trips completed</p>
          </Card>
          
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Gift className="h-5 w-5 text-warning" />
              </div>
              <span className="text-muted-foreground">Bonuses</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(15000)}</p>
            <p className="text-sm text-warning">This month</p>
          </Card>
        </div>
      )}

      {/* Transaction History */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Transaction History</h2>
          <Button variant="ghost" size="sm" className="gap-1">
            View All
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          {mockWalletTransactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                transaction.type === 'CREDIT' 
                  ? 'bg-success/10 text-success' 
                  : 'bg-destructive/10 text-destructive'
              }`}>
                {getTransactionIcon(transaction.type, transaction.reason)}
              </div>
              
              <div className="flex-1">
                <p className="font-medium">
                  {transaction.reason.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                </p>
                <p className="text-sm text-muted-foreground">
                  {transaction.description}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {format(new Date(transaction.createdAt), 'MMM d, yyyy • h:mm a')}
                </p>
              </div>
              
              <div className="text-right">
                <p className={`text-lg font-bold ${
                  transaction.type === 'CREDIT' ? 'text-success' : 'text-destructive'
                }`}>
                  {transaction.type === 'CREDIT' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </p>
                <p className="text-sm text-muted-foreground">
                  Balance: {formatCurrency(transaction.newBalance)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default WalletPage;