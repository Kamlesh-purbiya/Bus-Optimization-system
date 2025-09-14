'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Route, AlertCircle } from 'lucide-react';
import { handleSearch } from './search-actions';
import { GetRoutesForDestinationOutput } from '@/ai/flows/get-routes-for-destination';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function SearchDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<GetRoutesForDestinationOutput | null>(
    null
  );

  const onSearch = async () => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    const result = await handleSearch(searchTerm);
    if ('error' in result) {
      setError(result.error);
    } else {
      setResults(result);
    }
    setIsLoading(false);
  };

  const openDialog = () => {
    setIsOpen(true);
    setSearchTerm('');
    setResults(null);
    setError(null);
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={openDialog}
      >
        <Search className="h-5 w-5" />
        <span className="sr-only">Search</span>
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Find Your Route</DialogTitle>
            <DialogDescription>
              Enter your destination to find available bus routes.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="e.g., Marathahalli"
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            />
            <Button onClick={onSearch} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="mt-4 min-h-[200px] rounded-lg border border-dashed flex items-center justify-center p-4 bg-muted/50">
            {isLoading && (
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            )}
            {error && (
              <div className="text-center text-destructive">
                <AlertCircle className="mx-auto h-8 w-8 mb-2" />
                <p>{error}</p>
              </div>
            )}
            {results && (
              <div className="w-full text-left">
                <h3 className="font-semibold mb-2">Search Results</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {results.analysis}
                </p>
                {results.routes.length > 0 ? (
                  <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
                    {results.routes.map((route) => (
                      <Card key={route.id}>
                        <CardHeader className="flex flex-row items-center justify-between p-4">
                          <CardTitle className="text-base font-bold">
                            {route.number}
                          </CardTitle>
                          <Badge
                            variant={
                              route.status === 'Delayed'
                                ? 'destructive'
                                : 'default'
                            }
                          >
                            {route.status}
                          </Badge>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Route className="mr-2 h-4 w-4" />
                            <span>{route.name}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <p>No routes found for your destination.</p>
                  </div>
                )}
              </div>
            )}
            {!isLoading && !results && !error && (
              <div className="text-center text-muted-foreground">
                <Search className="mx-auto h-10 w-10 mb-2" />
                <p>Route details will appear here.</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
