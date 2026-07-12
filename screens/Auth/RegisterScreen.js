import React, { useState, useContext } from "react";
import { 
  TouchableOpacity, 
  TextInput 
} from "react-native";

import { AuthContext } from "../../context/AuthContext";
import { Block, Button, Text } from "../../components/ui";
import useTheme from "../../hooks/useTheme";


export default function RegisterScreen({ navigation }) {

  const { register } = useContext(AuthContext);
  const { colors, sizes } = useTheme();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  // trạng thái xem mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);



  const handleRegister = async () => {

    setError("");


    if (!email.trim() || !password) {
      setError("Nhập email và mật khẩu");
      return;
    }


    if (password.length < 6) {
      setError("Mật khẩu phải >= 6 ký tự");
      return;
    }


    if (password !== confirm) {
      setError("Mật khẩu nhập lại không khớp");
      return;
    }


    setLoading(true);


    try {

      await register(email.trim(), password);

    } catch (e) {

      setError(e?.message || "Lỗi đăng ký");

    } finally {

      setLoading(false);

    }

  };




  return (

    <Block 
      safe 
      gradient={colors.gradients?.secondary}
    >


      <Block 
        scroll 
        paddingHorizontal={sizes.padding}
      >



        <Block
          flex={0}
          paddingVertical={sizes.xl}
          marginTop={sizes.l}
        >


          <Text
            h1
            center
            bold
            marginBottom={sizes.s}
            gradient={colors.gradients?.primary}
          >

            Tạo tài khoản

          </Text>



          <Text
            h4
            center
            gray
            marginBottom={sizes.md}
          >

            Bắt đầu hành trình của bạn

          </Text>


        </Block>





        <Block
          card
          flex={0}
          padding={sizes.padding}
          marginBottom={sizes.m}
        >




          {/* Email */}

          <Text gray size={12} marginBottom={5}>
            Email
          </Text>


          <TextInput

            placeholder="example@email.com"

            value={email}

            onChangeText={setEmail}

            autoCapitalize="none"

            autoCorrect={false}

            keyboardType="email-address"

            style={{

              height:45,

              borderWidth:1,

              borderColor:"#ddd",

              borderRadius:sizes.inputRadius,

              paddingHorizontal:15,

              fontSize:15,

              marginBottom:sizes.sm

            }}

          />







          {/* Mật khẩu */}

          <Block
            flex={0}
            style={{
              position:"relative",
              marginBottom:sizes.sm
            }}
          >


            <Text gray size={12} marginBottom={5}>
              Mật khẩu
            </Text>



            <TextInput

              placeholder="Tối thiểu 6 ký tự"

              value={password}

              onChangeText={setPassword}

              secureTextEntry={!showPassword}

              autoCapitalize="none"

              autoCorrect={false}

              style={{

                height:45,

                borderWidth:1,

                borderColor:"#ddd",

                borderRadius:sizes.inputRadius,

                paddingHorizontal:15,

                paddingRight:50,

                fontSize:15

              }}

            />



            <TouchableOpacity

              onPress={() => 
                setShowPassword(!showPassword)
              }

              style={{

                position:"absolute",

                right:15,

                bottom:10

              }}

            >

              <Text size={18}>

                {showPassword ? "🙈" : "👁️"}

              </Text>


            </TouchableOpacity>


          </Block>









          {/* Xác nhận mật khẩu */}


          <Block
            flex={0}
            style={{
              position:"relative",
              marginBottom:sizes.sm
            }}
          >


            <Text gray size={12} marginBottom={5}>
              Xác nhận mật khẩu
            </Text>




            <TextInput


              placeholder="Nhập lại mật khẩu"


              value={confirm}


              onChangeText={setConfirm}


              secureTextEntry={!showConfirm}


              autoCapitalize="none"


              autoCorrect={false}



              style={{

                height:45,

                borderWidth:1,

                borderColor:"#ddd",

                borderRadius:sizes.inputRadius,

                paddingHorizontal:15,

                paddingRight:50,

                fontSize:15

              }}



            />





            <TouchableOpacity

              onPress={() => 
                setShowConfirm(!showConfirm)
              }


              style={{

                position:"absolute",

                right:15,

                bottom:10

              }}


            >


              <Text size={18}>

                {showConfirm ? "🙈" : "👁️"}

              </Text>


            </TouchableOpacity>


          </Block>









          {/* Error */}

          {!!error && (

            <Block

              flex={0}

              padding={sizes.s}

              radius={sizes.inputRadius}

              color="rgba(231,76,60,0.1)"

              marginBottom={sizes.sm}

            >


              <Text danger center>

                {error}

              </Text>


            </Block>


          )}








          {/* Button đăng ký */}


          <Button

            gradient={colors.gradients?.primary}

            shadow

            disabled={loading}

            onPress={handleRegister}

            marginVertical={sizes.sm}

            radius={sizes.buttonRadius}


            style={{

              paddingVertical:8,

              paddingHorizontal:18,

              alignItems:"center",

              alignSelf:"center",

              minWidth:150,

              borderWidth:1.2,

              borderColor:"#FACC15",

              opacity:loading ? 0.85 : 1

            }}

          >



            <Text 
              black 
              bold
              style={{
                fontSize:14
              }}
            >


              {loading 
                ? "Đang đăng ký..." 
                : "Tạo tài khoản"
              }


            </Text>


          </Button>

          {/* Chuyển sang Login */}


          <Button

            flex={0}

            onPress={() => navigation.navigate("Login")}

            marginTop={sizes.s}

          >
            <Text center primary semibold>
              Đã có tài khoản?{" "}
              <Text bold primary>
                Đăng nhập
              </Text>
            </Text>
          </Button>
        </Block>
      </Block>
    </Block>
  );
}
