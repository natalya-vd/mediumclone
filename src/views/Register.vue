<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sing Up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}"> Have an acount? </router-link>
          </p>
          <ValidationErrors
            v-if="validationErrors"
            :validationErrors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Username"
                v-model="dataForm.username"
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Email"
                v-model="dataForm.email"
              />
            </fieldset>

            <fieldset class="form-group">
              <input
                type="password"
                class="form-control form-control-lg"
                placeholder="Password"
                v-model="dataForm.password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Sing Up
            </button>
          </form>
          {{ isSubmitting }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from 'vuex';
import {computed, reactive} from 'vue';
import {useRouter} from 'vue-router';
import ValidationErrors from '@/components/ValidationErrors';
import {actionTypes} from '@/store/modules/auth';

const dataForm = reactive({
  email: '',
  username: '',
  password: '',
});

const store = useStore();
const isSubmitting = computed(() => store.state.auth.isSubmitting);
const validationErrors = computed(() => store.state.auth.validationErrors);

const router = useRouter();

function onSubmit() {
  store
    .dispatch(actionTypes.register, {
      email: dataForm.email,
      username: dataForm.username,
      password: dataForm.password,
    })
    .then((user) => {
      console.log('successfully register user', user);
      router.push({name: 'globalFeed'});
    });
}
</script>
