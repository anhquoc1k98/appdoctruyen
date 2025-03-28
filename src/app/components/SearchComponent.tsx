import { Button } from '../../components/ui/button';
import { CiSearch } from 'react-icons/ci';
import
{
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import http from '../../lib/http';
import React, { useState, useEffect, Suspense } from 'react';
import type { AlbumType } from '../../lib/type';
import AlbumsList from './list-productnew';
import Loading from '../loading';
import { DialogTitle } from '@radix-ui/react-dialog';

export default function SearchComponents()
{
    const [search, setSearch] = useState<string>("");
    const [albums, setAlbums] = useState<AlbumType[]>([]);


    const fetchAlbums = async () =>
    {
        if (!search.trim()) {
            setAlbums([]);
            return;
        }
        try {
            const response = await http.get<AlbumType[]>(`/api/albums?query=${encodeURIComponent(search)}`);
            setAlbums(response.payload || []);
        } catch (err) {
            setAlbums([]);
        }
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <CiSearch />
                </Button>
            </DialogTrigger>
            <DialogContent className="border-none p-0 bg-transparent flex flex-col sm:max-w-[425px] max-h-[525px] sm:min-h-[800px] overflow-auto ">
                <DialogTitle className='hidden'>Tiêu đề của dialog</DialogTitle>
                <div className="grid bg-color_puppy p-2">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Input
                            id="search"
                            className="col-span-3"
                            placeholder="Nhập tên album..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button onClick={() => fetchAlbums()}>Tìm kiếm</Button>
                    </div>
                </div>
                <div className="overflow-auto">
                    <Suspense fallback={<Loading />}>
                        <AlbumsList albums={albums} column={1} />
                    </Suspense>

                </div>
            </DialogContent>
        </Dialog>
    );
}
