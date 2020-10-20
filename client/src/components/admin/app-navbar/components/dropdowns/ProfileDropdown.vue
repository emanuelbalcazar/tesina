<template>
    <va-dropdown
        class="profile-dropdown"
        v-model="isShown"
        boundary-body
        offset="0, 16px"
    >
        <span
            class="profile-dropdown__anchor"
            slot="anchor"
            :style="{ color: this.$themes.primary }"
        >
            <slot />
            <va-icon
                class="pa-1"
                :name="`fa ${isShown ? 'fa-angle-up' : 'fa-angle-down'}`"
            />
        </span>
        <div class="profile-dropdown__content pl-4 pr-4 pt-2 pb-2">
            <div
                v-for="option in options"
                :key="option.name"
                @click="onClick(option)"
                class="profile-dropdown__item pt-1 pb-1 mt-2 mb-2"
            >
                {{ $t(`user.${option.name}`) }}
            </div>
        </div>
    </va-dropdown>
</template>

<script>
import Vue from "vue";

export default {
    name: "profile-section",
    data() {
        return {
            isShown: false
        };
    },
    methods: {
        onClick(option) {
            if (option.name == "logout") {
                this.$cookies.remove("userId");
                this.$cookies.remove("username");
                this.$cookies.remove("email");
                this.$cookies.remove("token");
                window.location.reload();
            }
        }
    },
    props: {
        options: {
            type: Array,
            default: () => [
                {
                    name: "profile",
                    redirectTo: ""
                },
                {
                    name: "logout",
                    redirectTo: ""
                }
            ]
        }
    }
};
</script>

<style lang="scss">
.profile-dropdown {
    cursor: pointer;

    &__anchor {
        color: $vue-green;
    }
    .va-dropdown-popper__anchor {
        display: flex;
        justify-content: flex-end;
    }
    &__content {
        background-color: $dropdown-background;
        box-shadow: $gray-box-shadow;
        border-radius: 0.5rem;
        width: 8rem;
    }
    &__item {
        display: block;
        color: $vue-darkest-blue;

        &:hover,
        &:active {
            color: $vue-green;
        }
    }

    .va-dropdown__anchor {
        display: inline-block;
    }
}
</style>
