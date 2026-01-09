import { Card } from '@/components/ui/card';
import { RoleBadge } from '@/components/RoleBadge';
import { mockDriverStats } from '@/data/mockData';
import { Star, TrendingUp } from 'lucide-react';

const RatingsPage = () => {
  const recentRatings = [
    { id: 1, rider: 'John A.', rating: 5, comment: 'Excellent driver, very professional!', date: 'Today' },
    { id: 2, rider: 'Amaka E.', rating: 5, comment: 'Smooth ride, arrived on time.', date: 'Yesterday' },
    { id: 3, rider: 'Bola T.', rating: 4, comment: 'Good experience overall.', date: '2 days ago' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold">Ratings & Reviews</h1>
          <RoleBadge role="DRIVER" />
        </div>
        <p className="text-muted-foreground">See what riders say about you</p>
      </div>

      <Card className="p-8 gradient-driver text-driver-foreground text-center">
        <Star className="h-12 w-12 mx-auto mb-4 fill-current" />
        <p className="text-6xl font-bold mb-2">{mockDriverStats.rating}</p>
        <p className="text-lg opacity-90">Average Rating</p>
        <p className="text-sm opacity-75 mt-2">Based on {mockDriverStats.totalTrips} trips</p>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Reviews</h2>
        <div className="space-y-4">
          {recentRatings.map((review) => (
            <div key={review.id} className="p-4 bg-muted rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{review.rider}</span>
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-warning fill-warning" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
              <p className="text-xs text-muted-foreground mt-2">{review.date}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default RatingsPage;