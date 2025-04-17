import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

// Função para buscar um novo usuário
async function loadUser() {
    let resp = await fetch("https://randomuser.me/api/");
    let data = await resp.json();
    let fakeUser = data.results[0];
    
    return {
        name: fakeUser.name.first + " " + fakeUser.name.last,
        username: fakeUser.login.username,
        email: fakeUser.email,
        urlPhoto: fakeUser.picture.medium
    };
}

export default function FakeUser() {
    const [user, setUser] = useState({
        name: "Ana Alface",
        username: "anaalface",
        email: "ana@ana.com",
        urlPhoto: "https://picsum.photos/200/300"
    });

    // Carregar um novo usuário quando o componente for montado
    useEffect(() => {
        async function fetchUser() {
            const newUser = await loadUser();
            setUser(newUser);
        }
        fetchUser();
    }, []);

    // Função de clique para atualizar o usuário
    const handleRefreshClick = async () => {
        const newUser = await loadUser();
        setUser(newUser);
    };

    return (
        <>
            <div className="flex items-center justify-between gap-1 bg-gray-200 my-1 p-2 rounded">
                <div className="flex items-center gap-2">
                    <div>
                        <img src={user.urlPhoto} alt="" className="w-16 h-16 rounded-lg" />
                    </div>
                    <div className="leading-5">
                        <div className="font-semibold">
                            {user.name}
                        </div>
                        <div>
                            @{user.username}
                        </div>
                        <div className="text-gray-500">
                            {user.email}
                        </div>
                    </div>
                </div>
                <div
                    className="bg-gray-400 p-1 rounded-lg flex items-center cursor-pointer hover:bg-gray-500"
                    onClick={handleRefreshClick} // Adiciona o evento de clique para atualizar o usuário
                >
                    <Icon icon="mdi-refresh" className="text-black text-3xl"/>
                </div>
            </div>
        </>
    );
}
