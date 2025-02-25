import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Droplet, Settings, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { stationData } from '@/lib/data/data';
import { tailwindColors, getWqiStatusColor } from '@/lib/colors/colors';

interface Station {
    id: number; 
    name: string;
    status: string; 
    lastReading: string;
    wqi: number;
  }

export function Header(): React.ReactElement  {
  return (
    <header className={`border-b bg-gradient-to-r from-${tailwindColors.header.from} via-${tailwindColors.header.via} to-${tailwindColors.header.to} text-${tailwindColors.ui.white} shadow-md`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Droplet className={`h-6 w-6 text-${tailwindColors.header.icon}`} />
          <h1 className={`text-xl font-semibold text-${tailwindColors.ui.white}`}>Apollodon</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className={`bg-${tailwindColors.ui.whiteTransparent10} border-${tailwindColors.ui.whiteTransparent20} text-${tailwindColors.ui.white} hover:bg-${tailwindColors.ui.whiteTransparent20} flex items-center gap-2`}>
                <span>Station Alpha</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Monitoring Stations</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {stationData.map((station: Station) => {
                const statusColor = getWqiStatusColor(station.wqi);
                return (
                  <DropdownMenuItem key={station.id} className="flex justify-between items-center">
                    <span>{station.name}</span>
                    <Badge className={`bg-${statusColor.bg} text-${statusColor.text}`}>
                      WQI: {station.wqi}
                    </Badge>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" className={`text-${tailwindColors.ui.white} hover:bg-${tailwindColors.ui.whiteTransparent10}`}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}