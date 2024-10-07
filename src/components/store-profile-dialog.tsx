import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { getManagedRestaurant, GetManagedRestaurantResponse } from "@/api/get-managed-restaurant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateProfile } from "@/api/update-profile";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";

const storeProfileSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
})

type StoreProfileSchema = z.infer<typeof storeProfileSchema>

export function StoreProfileDialog() {
  const queryclient = useQueryClient()
  const { data: managedRestaurant } = useQuery({
    queryKey: ['managed-restaurant'],
    queryFn: getManagedRestaurant,
})

  const { register, handleSubmit, formState: { isSubmitting }} = useForm<StoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: managedRestaurant?.name ?? '',
      description: managedRestaurant?.description ?? '',
    },
  })

  function updateManagedRestaurantCache({name, description}: StoreProfileSchema) {
    const cached = queryclient.getQueryData<GetManagedRestaurantResponse>(['managed-restaurant'])

    if (cached) {
      queryClient.setQueryData<GetManagedRestaurantResponse>(['managed-restaurant'], {
        ...cached,
        name,
        description,
      })
    }

    return { cached }

  }

  const { mutateAsync: updateProfileFn } = useMutation({
    mutationFn: updateProfile,
    onMutate({name, description}) {
      const { cached } = updateManagedRestaurantCache({name, description})

      return { previousProfile: cached }
    }, 
    onError(_, __, context) {
      if(context?.previousProfile) {
        updateManagedRestaurantCache(context.previousProfile)
      }
    }
  })

  async function hadleUpadateProfile(data: StoreProfileSchema) {
    try {
      await updateProfileFn({
        name: data.name,
        description: data.description,
      })

      toast.success("Perfil atualizado com sucess!")
    } catch {
      toast.error("Falha ao atualizar o perfil, tente novamente!")
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Perfil da loja</DialogTitle>
        <DialogDescription>
          Atualize as informações do seu estabelecimento visiveis ao seu cliente
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(hadleUpadateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Nome
            </Label>
            <Input className="col-span-3" id="name" {...register('name')}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="deccription">
              Descrição
            </Label>
            <Textarea className="col-span-3" id="description" {...register('description')}/>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost" type="button">Cancelar</Button>
          </DialogClose>
          <Button type="submit" variant="success" disabled={isSubmitting}>Salvar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}