"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileDown,
  MoreHorizontal,
  PlusCircle,
  Sparkles,
  Tag,
} from "lucide-react";
import { iocData, type Ioc } from "@/app/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AIInsightDialog } from "./ai-insight-dialog";

export function IocTable() {
  const [selectedIoc, setSelectedIoc] = React.useState<Ioc | null>(null);

  const getVariantForType = (
    type: string
  ): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case "IP Address":
        return "secondary";
      case "Domain":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-headline">
              Indicators of Compromise
            </CardTitle>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="outline">
                    <FileDown className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                  <DropdownMenuItem>Export as JSON</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Indicator</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {iocData.map((ioc) => (
                <TableRow key={ioc.id}>
                  <TableCell className="font-medium font-code">{ioc.indicator}</TableCell>
                  <TableCell>
                    <Badge variant={getVariantForType(ioc.type)}>
                      {ioc.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{ioc.timestamp}</TableCell>
                  <TableCell>{ioc.source}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {ioc.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => setSelectedIoc(ioc)}>
                          <Sparkles className="h-4 w-4" />
                          <span className="sr-only">Get AI Insight</span>
                       </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Tag className="mr-2 h-4 w-4" />
                            <span>Add Tag</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            <span>Create Alert</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {selectedIoc && (
         <AIInsightDialog
            isOpen={!!selectedIoc}
            onClose={() => setSelectedIoc(null)}
            ioc={selectedIoc}
        />
      )}
    </>
  );
}
