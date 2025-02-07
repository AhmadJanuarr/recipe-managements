import RecipeForm from "@/components/Admin/RecipeForm"
import axios from "axios"
import RecipeList from "@/components/Admin/RecipeList"
import PaginationControl from "@/components/Admin/PaginationControl"
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card } from "@/components/ui/card"
import { BookPlus } from "lucide-react"
import { Separator } from "@radix-ui/react-separator"
import { useState } from "react"
import { useIsMobile } from "@/hooks/useIsMobile"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { useQuery } from "@tanstack/react-query"

export default function RecipesPages() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<number>(1)
  const recordPerPage: number = 10
  const lastIndex = current * recordPerPage
  const firstIndex = lastIndex - recordPerPage
  const isDesktop = useIsMobile()

  const fetchData = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/recipes`)
    return data
  }

  const { data, isLoading } = useQuery({ queryKey: ["recipes"], queryFn: fetchData })
  const recipes = Array.isArray(data?.data) ? data?.data : []
  const records = recipes.slice(firstIndex, lastIndex)
  const totalPage = Math.ceil(recipes.length / recordPerPage)
  const number = [...Array(totalPage + 1).keys()].slice(1)
  const prevPage = () => {
    if (current === 1) return
    if (current !== firstIndex) {
      setCurrent(current - 1)
    }
  }
  const changePage = (id: number) => {
    setCurrent(id)
  }
  const nextPage = () => {
    if (current === totalPage) return
    if (current !== lastIndex) {
      setCurrent(current + 1)
    }
  }

  return (
    <section className="flex w-full">
      <div className="w-full px-10">
        <div className="pt-10">
          <h1 className="text-3xl font-bold">Manajemen Resep</h1>
          <p>Tambahkan resep makanan daerah sesuai form yang tersedia</p>
        </div>

        <Card className="my-10 w-full px-4">
          <div className="flex w-full justify-between px-3 py-5 text-sm leading-none text-muted-foreground">
            <div className="flex items-center gap-5">
              <BookPlus />
              <h2 className="font-medium">Recipes list</h2>
            </div>

            <div>
              {!isDesktop ? (
                //DEKSTOP DEVICE
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant="default">Tambahkan Resep Baru</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[900px]">
                    <DialogHeader>
                      <DialogTitle>Tambahkan Resep Baru</DialogTitle>
                      <DialogDescription>Isi formulir di bawah ini untuk menambahkan resep baru..</DialogDescription>
                    </DialogHeader>
                    <RecipeForm />
                  </DialogContent>
                </Dialog>
              ) : (
                //MOBILE DEVICE
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger asChild>
                    <Button variant="default">Tambahkan Resep Baru</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Tambahkan Resep Baru</DrawerTitle>
                      <DrawerDescription>Isi formulir di bawah ini untuk menambahkan resep baru..</DrawerDescription>
                    </DrawerHeader>
                    <RecipeForm className="px-4" />
                    <DrawerFooter className="pt-2">
                      <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              )}
            </div>
          </div>

          <Separator />

          <Table>
            <TableHeader>
              <TableRow className="text-[13px]">
                <TableHead className="w-[50px] text-black">ID</TableHead>
                <TableHead className="w-[150px] text-black">NAMA RESEP</TableHead>
                <TableHead className="text-black">GAMBAR</TableHead>
                <TableHead className="w-[300px] text-black">DESKRIPSI</TableHead>
                <TableHead className="text-black">KATEGORI</TableHead>
                <TableHead className="text-black">BAHAN</TableHead>
                <TableHead className="text-black">LANGKAH</TableHead>
                <TableHead className="text-black">AKSI</TableHead>
              </TableRow>
            </TableHeader>

            {isLoading ? <div>Loading...</div> : <RecipeList recipes={records} />}
          </Table>
          <PaginationControl
            numbers={number}
            current={current}
            prevPage={prevPage}
            changePage={changePage}
            nextPage={nextPage}
          />
        </Card>
      </div>
    </section>
  )
}
