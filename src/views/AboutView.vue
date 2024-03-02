<template>
    <div class="about container">
        <h2 class="text-3xl text-center py-5">About</h2>
        <hr>
        <div class="grid grid-cols-2 gap-5 my-4">
            <main>
                <section class="p-3 flex gap-4 bg-slate-100 rounded mb-2">
                    <h5 class="mt-0 mb-3 text-teal-600">Udhaar</h5>
                    <ul class="list-disc list-inside">
                        <li>Dashboard</li>
                        <li>Add udhaar</li>
                        <li>Add payee</li>
                        <li>Add transaction</li>
                    </ul>
                </section>
                <section class="p-3 flex gap-4 bg-slate-100 rounded mb-2">
                    <h5 class="mt-0 mb-3 text-teal-600">Invoice</h5>
                    <ul class="list-disc list-inside">
                        <li>Add invoice</li>
                        <li>Add company</li>
                        <li>Add items in invoice</li>
                        <li>Print / download invoice</li>
                    </ul>
                </section>
                <section class="p-3 flex gap-4 bg-slate-100 rounded mb-2">
                    <h5 class="mt-0 mb-3 text-teal-600">Movies</h5>
                    <ul class="list-disc list-inside">
                        <li>Search movies by title</li>
                        <li>Grid view with pagination</li>
                        <li>Get details of movie (in progress)</li>
                    </ul>
                </section>
            </main>
            <aside>
                <p>Created using </p>
                <ul class="list-inside list-disc">
                    <li>Vue js 3</li>
                    <li>Tailwind</li>
                    <li>Firebase</li>
                </ul>
            </aside>
        </div>
    </div>
</template>
<style>
@media (min-width: 1024px) {
    .about {
        /*min-height: 100vh;*/
        /*display: flex;*/
        /*align-items: center;*/
    }
}
</style>