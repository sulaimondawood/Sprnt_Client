import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { RoleBadge } from "@/components/RoleBadge";
import { mockSupportTickets } from "@/data/mockData";
import {
  HelpCircle,
  Plus,
  MessageSquare,
  Phone,
  Mail,
  ChevronRight,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const SupportPage = () => {
  const { user } = useAuth();
  const [newTicketOpen, setNewTicketOpen] = useState(false);
  const [ticketTitle, setTicketTitle] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketCategory, setTicketCategory] = useState("");
  const { toast } = useToast();

  const handleSubmitTicket = () => {
    if (!ticketTitle || !ticketDescription || !ticketCategory) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Ticket Submitted",
      description: "We'll get back to you as soon as possible.",
    });
    setNewTicketOpen(false);
    setTicketTitle("");
    setTicketDescription("");
    setTicketCategory("");
  };

  const faqs = [
    {
      question: "How do I cancel a ride?",
      answer:
        "You can cancel a ride from the trip details screen before the driver arrives. Note that cancellation fees may apply.",
    },
    {
      question: "How are fares calculated?",
      answer:
        "Fares are calculated based on distance, time, and current demand. You'll always see the estimated fare before booking.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept wallet payments, debit/credit cards, and cash payments.",
    },
    {
      question: "How do I report a lost item?",
      answer:
        "Contact support through this page or call our helpline. We'll help you connect with the driver.",
    },
  ];

  const contactOptions = [
    {
      icon: Phone,
      title: "Call Support",
      description: "Available 24/7",
      action: "+234 800 123 4567",
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Response within 24hrs",
      action: "support@Sprnt.com",
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Chat with an agent",
      action: "Start Chat",
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "RESOLVED":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "IN_PROGRESS":
        return <Clock className="h-5 w-5 text-info" />;
      default:
        return <AlertCircle className="h-5 w-5 text-warning" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">Support</h1>
            <RoleBadge role={user?.role || "RIDER"} />
          </div>
          <p className="text-muted-foreground">
            Get help with your account, trips, and more
          </p>
        </div>

        <Dialog open={newTicketOpen} onOpenChange={setNewTicketOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Support Ticket</DialogTitle>
              <DialogDescription>
                Describe your issue and we'll get back to you as soon as
                possible.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={ticketCategory}
                  onValueChange={setTicketCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payment">Payment Issue</SelectItem>
                    <SelectItem value="trip">Trip Issue</SelectItem>
                    <SelectItem value="account">Account Issue</SelectItem>
                    <SelectItem value="driver">Driver Complaint</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Subject</Label>
                <Input
                  placeholder="Brief description of your issue"
                  value={ticketTitle}
                  onChange={(e) => setTicketTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Please provide as much detail as possible..."
                  rows={4}
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                />
              </div>

              <Button onClick={handleSubmitTicket} className="w-full">
                Submit Ticket
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Contact Options */}
      <div className="grid sm:grid-cols-3 gap-4">
        {contactOptions.map((option) => (
          <Card
            key={option.title}
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <option.icon className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{option.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {option.description}
                </p>
                <p className="text-primary font-medium">{option.action}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* My Tickets */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">My Tickets</h2>
            <Button variant="ghost" size="sm" className="gap-1">
              View All
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {mockSupportTickets.length === 0 ? (
            <div className="text-center py-8">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No support tickets yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockSupportTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    {getStatusIcon(ticket.status)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="font-medium truncate">{ticket.title}</p>
                        <StatusBadge status={ticket.status} type="ticket" />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {ticket.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {format(new Date(ticket.createdAt), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* FAQs */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group p-4 border border-border rounded-xl cursor-pointer"
              >
                <summary className="font-medium list-none flex items-center justify-between">
                  {faq.question}
                  <ChevronRight className="h-4 w-4 transition-transform group-open:rotate-90" />
                </summary>
                <p className="text-muted-foreground mt-3 pt-3 border-t border-border">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SupportPage;
