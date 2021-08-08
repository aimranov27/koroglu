<template>
    <div>
        <v-card class="my-1">
            <v-stepper-header class="d-flex justify-center flex-column-reverse">
                <v-toolbar-title class="text-uppercase">
                    Torrent Cloud Util
                </v-toolbar-title>
            </v-stepper-header>
            <v-form>
                <v-row class="d-flex justify-end">
                    <v-col cols="12" sm="5">
                        <v-list-item>
                            <v-list-item-title class="headline">Fill in the form</v-list-item-title>
                        </v-list-item>
                    </v-col>
                </v-row>
                <v-row class="d-flex justify-end">
                    <v-col cols="12" sm="4">
                        <v-text-field
                                v-model="form.createInstanceDTO.projectName"
                                label="Project name">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row class="d-flex justify-end">
                    <v-col cols="12" sm="4">
                        <v-text-field
                                v-model="form.createInstanceDTO.instanceName"
                                label="Instance name">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row class="d-flex justify-end">
                    <v-col cols="12" sm="4">
                        <v-text-field
                                v-model="form.createInstanceDTO.zoneName"
                                label="Zone name">
                        </v-text-field>
                    </v-col>
                </v-row>
                <v-row class="d-flex justify-end">
                    <v-col cols="12" sm="4">
                        <v-file-input
                                accept=".torrent"
                                placeholder="upload file"
                                prepend-icon="mdi-file"
                                label="File"
                                v-model="form.file"
                        ></v-file-input>
                    </v-col>
                </v-row>
                <v-row class="d-flex justify-end">
                    <v-col cols="12" sm="4"><v-btn
                        color="secondary"
                        title="Отправить"
                        @click="onSubmitForm"
                    >Отправить</v-btn>
                    </v-col>
                </v-row>
            </v-form>
        </v-card>
        <v-snackbar
                :color="snackbar.color"
                v-model="snackbar.status"
                top
                :timeout="timeout"
        >
            {{ snackbar.text }}
            <v-btn color="white" text @click="snackbar.status = false">
                Закрыть
            </v-btn>
        </v-snackbar>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'Home',
        props: {
            msg: String
        },
        data() {
            return {
                form: {
                    createInstanceDTO: {
                        projectName: "",
                        instanceName: "",
                        zoneName: "",
                    },
                    file: null,
                },
                snackbar: {
                    status: false,
                    text: "",
                    color: "info",
                },
                timeout: 3000,
            }
        },
        methods: {
            onSubmitForm() {
                let this_ = this;
                let form = new FormData();
                form.append("createInstanceDTO", JSON.stringify(this_.form.createInstanceDTO));
                form.append("file", this_.form.file);
                this.$http.post(this.$endpoint.submitInfo, form, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                }).then(
                        () => {
                            this_.snackbar.status = true;
                            this_.snackbar.text = "Успешно";
                            this_.snackbar.color = "info";
                        },
                        () => {
                            this_.snackbar.status = true;
                            this_.snackbar.text = "Ошибка";
                            this_.snackbar.color = "error";
                        }
                    )
                    .finally(() => {
                        this.form = {
                            createInstanceDTO: {
                                projectName: "",
                                instanceName: "",
                                zoneName: "",
                            },
                            file: null,
                        }
                    });
            }
        }
    }
</script>

