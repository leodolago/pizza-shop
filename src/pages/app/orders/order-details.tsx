import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function OrderDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Pedido: 313533jk5k3h5l1</DialogTitle>
        <DialogDescription>Detalhes do pedido</DialogDescription>
      </DialogHeader>
      <div className="space-y-6">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                  <span className="font-medium text-muted-foreground">Pendente</span>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Cliente</TableCell>
              <TableCell className="flex justify-end">
                Leonardo B Lago
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Telefone</TableCell>
              <TableCell className="flex justify-end">
                (11) 999999-9999
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Email</TableCell>
              <TableCell className="flex justify-end">
                leodolago@gmail.com
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-muted-foreground">Realizado há</TableCell>
              <TableCell className="flex justify-end">
                Há 3 minutos
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead className="text-right">Qtd.</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableCell>Pizza Pepperoni Família</TableCell>
            <TableCell className="text-right">2</TableCell>
            <TableCell className="text-right">R$ 69,98</TableCell>
            <TableCell className="text-right">R$ 139,80</TableCell>
          </TableBody>
          <TableBody>
            <TableCell>Pizza Mussarella Família</TableCell>
            <TableCell className="text-right">2</TableCell>
            <TableCell className="text-right">R$ 59,98</TableCell>
            <TableCell className="text-right">R$ 119,80</TableCell>
          </TableBody>
          <TableFooter>
            <TableCell colSpan={3}>Total do pedido</TableCell>
            <TableCell className="text-right font-medium">
              R$ 259,60
            </TableCell>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  )
}