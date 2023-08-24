<template>
    <div>
        <VbOpenTable />
        <nuxt-child />
    </div>
</template>

<script>
import VbOpenTable from '@/www/components/uc/manager/course/schedule/vbOpenTable';
export default {
    components: {
        VbOpenTable,
    },
    middleware({ route, redirect }) {
        if (route.path == '/uc/manager/course/schedule') {
            return redirect('/uc/manager/course/schedule/collection');
        }
    },
};
</script>
