package com.utils;

import org.apache.commons.codec.binary.Base64;

import java.io.UnsupportedEncodingException;

/**
 * base64的编码解码
 * Created by ozc on 2017/12/8.
 *
 * @author ozc
 * @version 1.0
 */
public class Base64Util {


    private static final String UTF_8 = "UTF-8";
    /**
     * 对给定的字符串进行base64解码操作
     */
    public static String decodeData(String inputData) {
        try {
            if (null == inputData) {
                return null;
            }
            return new String(Base64.decodeBase64(inputData.getBytes(UTF_8)), UTF_8);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return null;
    }

    /**
     * 对给定的字符串进行base64加密操作
     */
    public static String encodeData(String inputData) {
        try {
            if (null == inputData) {
                return null;
            }
            return new String(Base64.encodeBase64(inputData.getBytes(UTF_8)), UTF_8);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();

        }

        return null;
    }

    public static void main(String[] args) {
        String s = Base64Util.encodeData("a6a7e3c7-c104-11e7-aef7-d8cb8a81419e");
        System.out.println(s);
    }


}
