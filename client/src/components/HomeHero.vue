<template>
  <v-parallax src="../assets/img/dark-star-background.jpg" jumbotron>
    <v-card flat class="pa-2 transparent" dark>
      <v-row align="start" class="mt-12">
        <v-col md="2"></v-col>
        <v-col cols="12" md="10">
          <v-row>
            <v-col cols="12">
              <p class="mt-6 display-1 font-weight-bold">
                We make awesome things.
              </p>
              <p class="headline">
                <span class="amber--text">You</span>
                can too.
              </p>
            </v-col>

            <v-col cols="12" md="6">
              <v-btn x-large color="primary" class="mr-3" to="/signup">
                Sign up
              </v-btn>
              <v-btn x-large outlined dark to="/#features">Details</v-btn>
              <span>
                <br />

                <v-btn dark dense to="/login" text class="ml-auto">
                  or
                  <span
                    class="pl-3"
                    style="text-decoration:underline;text-underline-position: under"
                  >
                    login
                  </span>
                </v-btn>
              </span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-parallax>
</template>
