/**
 * des3iv:向量 secert_key: 密钥
 */
var des3iv = '';
var secert_key = '';
var DES3 = (function (des3iv, secert_key) {

    /**
     * DES 加密算法
     *
     * 该函数接受一个 8 字节字符串作为普通 DES 算法的密钥（也就是 64 位，但是算法只使用 56 位），或者接受一个 24 字节字符串作为 3DES
     * 算法的密钥；第二个参数是要加密或解密的信息字符串；第三个布尔值参数用来说明信息是加密还是解密；接下来的可选参数 mode 如果是 0 表示 ECB
     * 模式，1 表示 CBC 模式，默认是 ECB 模式；最后一个可选项是一个 8 字节的输入向量字符串（在 ECB 模式下不使用）。返回的密文是字符串。
     *
     * 参数： <br>
     * key: 8字节字符串作为普通 DES 算法的密钥,或 24 字节字符串作为 3DES <br>
     * message： 加密或解密的信息字符串<br>
     * encrypt: 布尔值参数用来说明信息是加密还是解密<br>
     * mode: 1:CBC模式，0:ECB模式(默认)<br>
     * iv:<br>
     * padding: 可选项, 8字节的输入向量字符串（在 ECB 模式下不使用）
     */
    var des = function (key, message, encrypt, mode, iv, padding) {
        if (encrypt) // 如果是加密的话，首先转换编码
            message = unescape(encodeURIComponent(message));
        // declaring this locally speeds things up a bit
        var spfunction1 = new Array(0x1010400, 0, 0x10000, 0x1010404, 0x1010004,
            0x10404, 0x4, 0x10000, 0x400, 0x1010400, 0x1010404, 0x400,
            0x1000404, 0x1010004, 0x1000000, 0x4, 0x404, 0x1000400, 0x1000400,
            0x10400, 0x10400, 0x1010000, 0x1010000, 0x1000404, 0x10004,
            0x1000004, 0x1000004, 0x10004, 0, 0x404, 0x10404, 0x1000000,
            0x10000, 0x1010404, 0x4, 0x1010000, 0x1010400, 0x1000000,
            0x1000000, 0x400, 0x1010004, 0x10000, 0x10400, 0x1000004, 0x400,
            0x4, 0x1000404, 0x10404, 0x1010404, 0x10004, 0x1010000, 0x1000404,
            0x1000004, 0x404, 0x10404, 0x1010400, 0x404, 0x1000400, 0x1000400,
            0, 0x10004, 0x10400, 0, 0x1010004);
        var spfunction2 = new Array(-0x7fef7fe0, -0x7fff8000, 0x8000, 0x108020,
            0x100000, 0x20, -0x7fefffe0, -0x7fff7fe0, -0x7fffffe0, -0x7fef7fe0,
            -0x7fef8000, -0x80000000, -0x7fff8000, 0x100000, 0x20, -0x7fefffe0,
            0x108000, 0x100020, -0x7fff7fe0, 0, -0x80000000, 0x8000, 0x108020,
            -0x7ff00000, 0x100020, -0x7fffffe0, 0, 0x108000, 0x8020,
            -0x7fef8000, -0x7ff00000, 0x8020, 0, 0x108020, -0x7fefffe0,
            0x100000, -0x7fff7fe0, -0x7ff00000, -0x7fef8000, 0x8000,
            -0x7ff00000, -0x7fff8000, 0x20, -0x7fef7fe0, 0x108020, 0x20,
            0x8000, -0x80000000, 0x8020, -0x7fef8000, 0x100000, -0x7fffffe0,
            0x100020, -0x7fff7fe0, -0x7fffffe0, 0x100020, 0x108000, 0,
            -0x7fff8000, 0x8020, -0x80000000, -0x7fefffe0, -0x7fef7fe0,
            0x108000);
        var spfunction3 = new Array(0x208, 0x8020200, 0, 0x8020008, 0x8000200, 0,
            0x20208, 0x8000200, 0x20008, 0x8000008, 0x8000008, 0x20000,
            0x8020208, 0x20008, 0x8020000, 0x208, 0x8000000, 0x8, 0x8020200,
            0x200, 0x20200, 0x8020000, 0x8020008, 0x20208, 0x8000208, 0x20200,
            0x20000, 0x8000208, 0x8, 0x8020208, 0x200, 0x8000000, 0x8020200,
            0x8000000, 0x20008, 0x208, 0x20000, 0x8020200, 0x8000200, 0, 0x200,
            0x20008, 0x8020208, 0x8000200, 0x8000008, 0x200, 0, 0x8020008,
            0x8000208, 0x20000, 0x8000000, 0x8020208, 0x8, 0x20208, 0x20200,
            0x8000008, 0x8020000, 0x8000208, 0x208, 0x8020000, 0x20208, 0x8,
            0x8020008, 0x20200);
        var spfunction4 = new Array(0x802001, 0x2081, 0x2081, 0x80, 0x802080,
            0x800081, 0x800001, 0x2001, 0, 0x802000, 0x802000, 0x802081, 0x81,
            0, 0x800080, 0x800001, 0x1, 0x2000, 0x800000, 0x802001, 0x80,
            0x800000, 0x2001, 0x2080, 0x800081, 0x1, 0x2080, 0x800080, 0x2000,
            0x802080, 0x802081, 0x81, 0x800080, 0x800001, 0x802000, 0x802081,
            0x81, 0, 0, 0x802000, 0x2080, 0x800080, 0x800081, 0x1, 0x802001,
            0x2081, 0x2081, 0x80, 0x802081, 0x81, 0x1, 0x2000, 0x800001,
            0x2001, 0x802080, 0x800081, 0x2001, 0x2080, 0x800000, 0x802001,
            0x80, 0x800000, 0x2000, 0x802080);
        var spfunction5 = new Array(0x100, 0x2080100, 0x2080000, 0x42000100,
            0x80000, 0x100, 0x40000000, 0x2080000, 0x40080100, 0x80000,
            0x2000100, 0x40080100, 0x42000100, 0x42080000, 0x80100, 0x40000000,
            0x2000000, 0x40080000, 0x40080000, 0, 0x40000100, 0x42080100,
            0x42080100, 0x2000100, 0x42080000, 0x40000100, 0, 0x42000000,
            0x2080100, 0x2000000, 0x42000000, 0x80100, 0x80000, 0x42000100,
            0x100, 0x2000000, 0x40000000, 0x2080000, 0x42000100, 0x40080100,
            0x2000100, 0x40000000, 0x42080000, 0x2080100, 0x40080100, 0x100,
            0x2000000, 0x42080000, 0x42080100, 0x80100, 0x42000000, 0x42080100,
            0x2080000, 0, 0x40080000, 0x42000000, 0x80100, 0x2000100,
            0x40000100, 0x80000, 0, 0x40080000, 0x2080100, 0x40000100);
        var spfunction6 = new Array(0x20000010, 0x20400000, 0x4000, 0x20404010,
            0x20400000, 0x10, 0x20404010, 0x400000, 0x20004000, 0x404010,
            0x400000, 0x20000010, 0x400010, 0x20004000, 0x20000000, 0x4010, 0,
            0x400010, 0x20004010, 0x4000, 0x404000, 0x20004010, 0x10,
            0x20400010, 0x20400010, 0, 0x404010, 0x20404000, 0x4010, 0x404000,
            0x20404000, 0x20000000, 0x20004000, 0x10, 0x20400010, 0x404000,
            0x20404010, 0x400000, 0x4010, 0x20000010, 0x400000, 0x20004000,
            0x20000000, 0x4010, 0x20000010, 0x20404010, 0x404000, 0x20400000,
            0x404010, 0x20404000, 0, 0x20400010, 0x10, 0x4000, 0x20400000,
            0x404010, 0x4000, 0x400010, 0x20004010, 0, 0x20404000, 0x20000000,
            0x400010, 0x20004010);
        var spfunction7 = new Array(0x200000, 0x4200002, 0x4000802, 0, 0x800,
            0x4000802, 0x200802, 0x4200800, 0x4200802, 0x200000, 0, 0x4000002,
            0x2, 0x4000000, 0x4200002, 0x802, 0x4000800, 0x200802, 0x200002,
            0x4000800, 0x4000002, 0x4200000, 0x4200800, 0x200002, 0x4200000,
            0x800, 0x802, 0x4200802, 0x200800, 0x2, 0x4000000, 0x200800,
            0x4000000, 0x200800, 0x200000, 0x4000802, 0x4000802, 0x4200002,
            0x4200002, 0x2, 0x200002, 0x4000000, 0x4000800, 0x200000,
            0x4200800, 0x802, 0x200802, 0x4200800, 0x802, 0x4000002, 0x4200802,
            0x4200000, 0x200800, 0, 0x2, 0x4200802, 0, 0x200802, 0x4200000,
            0x800, 0x4000002, 0x4000800, 0x800, 0x200002);
        var spfunction8 = new Array(0x10001040, 0x1000, 0x40000, 0x10041040,
            0x10000000, 0x10001040, 0x40, 0x10000000, 0x40040, 0x10040000,
            0x10041040, 0x41000, 0x10041000, 0x41040, 0x1000, 0x40, 0x10040000,
            0x10000040, 0x10001000, 0x1040, 0x41000, 0x40040, 0x10040040,
            0x10041000, 0x1040, 0, 0, 0x10040040, 0x10000040, 0x10001000,
            0x41040, 0x40000, 0x41040, 0x40000, 0x10041000, 0x1000, 0x40,
            0x10040040, 0x1000, 0x41040, 0x10001000, 0x40, 0x10000040,
            0x10040000, 0x10040040, 0x10000000, 0x40000, 0x10001040, 0,
            0x10041040, 0x40040, 0x10000040, 0x10040000, 0x10001000,
            0x10001040, 0, 0x10041040, 0x41000, 0x41000, 0x1040, 0x1040,
            0x40040, 0x10000000, 0x10041000);

        // create the 16 or 48 subkeys we will need
        var keys = des_createKeys(key);
        var m = 0, i, j, temp, temp2, right1, right2, left, right, looping;
        var cbcleft, cbcleft2, cbcright, cbcright2
        var endloop, loopinc;
        var len = message.length;
        var chunk = 0;
        // set up the loops for single and triple des
        var iterations = keys.length == 32 ? 3 : 9; // single or triple des
        if (iterations == 3) {
            looping = encrypt ? new Array(0, 32, 2) : new Array(30, -2, -2);
        } else {
            looping = encrypt ? new Array(0, 32, 2, 62, 30, -2, 64, 96, 2)
                : new Array(94, 62, -2, 32, 64, 2, 30, -2, -2);
        }

        // pad the message depending on the padding parameter
        if (padding == 2)
            message += "        "; // pad the message with spaces
        else if (padding == 1) {
            if (encrypt) {
                temp = 8 - (len % 8);
                message += String.fromCharCode(temp, temp, temp, temp, temp, temp,
                    temp, temp);
                if (temp === 8)
                    len += 8;
            }
        } // PKCS7 padding
        else if (!padding)
            message += "\0\0\0\0\0\0\0\0"; // pad the message out with null bytes

        // store the result here
        var result = "";
        var tempresult = "";

        if (mode == 1) { // CBC mode
            cbcleft = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16)
                | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
            cbcright = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16)
                | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
            m = 0;
        }

        // loop through each 64 bit chunk of the message
        while (m < len) {
            left = (message.charCodeAt(m++) << 24)
                | (message.charCodeAt(m++) << 16)
                | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);
            right = (message.charCodeAt(m++) << 24)
                | (message.charCodeAt(m++) << 16)
                | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);

            // for Cipher Block Chaining mode, xor the message with the previous
            // result
            if (mode == 1) {
                if (encrypt) {
                    left ^= cbcleft;
                    right ^= cbcright;
                } else {
                    cbcleft2 = cbcleft;
                    cbcright2 = cbcright;
                    cbcleft = left;
                    cbcright = right;
                }
            }

            // first each 64 but chunk of the message must be permuted according to
            // IP
            temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
            right ^= temp;
            left ^= (temp << 4);
            temp = ((left >>> 16) ^ right) & 0x0000ffff;
            right ^= temp;
            left ^= (temp << 16);
            temp = ((right >>> 2) ^ left) & 0x33333333;
            left ^= temp;
            right ^= (temp << 2);
            temp = ((right >>> 8) ^ left) & 0x00ff00ff;
            left ^= temp;
            right ^= (temp << 8);
            temp = ((left >>> 1) ^ right) & 0x55555555;
            right ^= temp;
            left ^= (temp << 1);

            left = ((left << 1) | (left >>> 31));
            right = ((right << 1) | (right >>> 31));

            // do this either 1 or 3 times for each chunk of the message
            for (j = 0; j < iterations; j += 3) {
                endloop = looping[j + 1];
                loopinc = looping[j + 2];
                // now go through and perform the encryption or decryption
                for (i = looping[j]; i != endloop; i += loopinc) { // for
                    // efficiency
                    right1 = right ^ keys[i];
                    right2 = ((right >>> 4) | (right << 28)) ^ keys[i + 1];
                    // the result is attained by passing these bytes through the S
                    // selection functions
                    temp = left;
                    left = right;
                    right = temp
                        ^ (spfunction2[(right1 >>> 24) & 0x3f]
                            | spfunction4[(right1 >>> 16) & 0x3f]
                            | spfunction6[(right1 >>> 8) & 0x3f]
                            | spfunction8[right1 & 0x3f]
                            | spfunction1[(right2 >>> 24) & 0x3f]
                            | spfunction3[(right2 >>> 16) & 0x3f]
                            | spfunction5[(right2 >>> 8) & 0x3f] | spfunction7[right2 & 0x3f]);
                }
                temp = left;
                left = right;
                right = temp; // unreverse left and right
            } // for either 1 or 3 iterations

            // move then each one bit to the right
            left = ((left >>> 1) | (left << 31));
            right = ((right >>> 1) | (right << 31));

            // now perform IP-1, which is IP in the opposite direction
            temp = ((left >>> 1) ^ right) & 0x55555555;
            right ^= temp;
            left ^= (temp << 1);
            temp = ((right >>> 8) ^ left) & 0x00ff00ff;
            left ^= temp;
            right ^= (temp << 8);
            temp = ((right >>> 2) ^ left) & 0x33333333;
            left ^= temp;
            right ^= (temp << 2);
            temp = ((left >>> 16) ^ right) & 0x0000ffff;
            right ^= temp;
            left ^= (temp << 16);
            temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
            right ^= temp;
            left ^= (temp << 4);

            // for Cipher Block Chaining mode, xor the message with the previous
            // result
            if (mode == 1) {
                if (encrypt) {
                    cbcleft = left;
                    cbcright = right;
                } else {
                    left ^= cbcleft2;
                    right ^= cbcright2;
                }
            }
            tempresult += String.fromCharCode((left >>> 24),
                ((left >>> 16) & 0xff), ((left >>> 8) & 0xff), (left & 0xff),
                (right >>> 24), ((right >>> 16) & 0xff),
                ((right >>> 8) & 0xff), (right & 0xff));

            chunk += 8;
            if (chunk == 512) {
                result += tempresult;
                tempresult = "";
                chunk = 0;
            }
        } // for every 8 characters, or 64 bits in the message

        // return the result as an array
        result += tempresult;
        result = result.replace(/\0*$/g, "");

        if (!encrypt) { // 如果是解密的话，解密结束后对PKCS7 padding进行解码，并转换成utf-8编码
            if (padding === 1) { // PKCS7 padding解码
                var len = result.length, paddingChars = 0;
                len && (paddingChars = result.charCodeAt(len - 1));
                (paddingChars <= 8)
                && (result = result.substring(0, len - paddingChars));
            }
            // 转换成UTF-8编码
            result = decodeURIComponent(escape(result));
        }

        return result;
    }; // end of des

    // des_createKeys
    // this takes as input a 64 bit key (even though only 56 bits are used)
    // as an array of 2 integers, and returns 16 48 bit keys
    var des_createKeys = function (key) {
        // declaring this locally speeds things up a bit
        var pc2bytes0 = new Array(0, 0x4, 0x20000000, 0x20000004, 0x10000, 0x10004,
            0x20010000, 0x20010004, 0x200, 0x204, 0x20000200, 0x20000204,
            0x10200, 0x10204, 0x20010200, 0x20010204);
        var pc2bytes1 = new Array(0, 0x1, 0x100000, 0x100001, 0x4000000, 0x4000001,
            0x4100000, 0x4100001, 0x100, 0x101, 0x100100, 0x100101, 0x4000100,
            0x4000101, 0x4100100, 0x4100101);
        var pc2bytes2 = new Array(0, 0x8, 0x800, 0x808, 0x1000000, 0x1000008,
            0x1000800, 0x1000808, 0, 0x8, 0x800, 0x808, 0x1000000, 0x1000008,
            0x1000800, 0x1000808);
        var pc2bytes3 = new Array(0, 0x200000, 0x8000000, 0x8200000, 0x2000,
            0x202000, 0x8002000, 0x8202000, 0x20000, 0x220000, 0x8020000,
            0x8220000, 0x22000, 0x222000, 0x8022000, 0x8222000);
        var pc2bytes4 = new Array(0, 0x40000, 0x10, 0x40010, 0, 0x40000, 0x10,
            0x40010, 0x1000, 0x41000, 0x1010, 0x41010, 0x1000, 0x41000, 0x1010,
            0x41010);
        var pc2bytes5 = new Array(0, 0x400, 0x20, 0x420, 0, 0x400, 0x20, 0x420,
            0x2000000, 0x2000400, 0x2000020, 0x2000420, 0x2000000, 0x2000400,
            0x2000020, 0x2000420);
        var pc2bytes6 = new Array(0, 0x10000000, 0x80000, 0x10080000, 0x2,
            0x10000002, 0x80002, 0x10080002, 0, 0x10000000, 0x80000,
            0x10080000, 0x2, 0x10000002, 0x80002, 0x10080002);
        var pc2bytes7 = new Array(0, 0x10000, 0x800, 0x10800, 0x20000000,
            0x20010000, 0x20000800, 0x20010800, 0x20000, 0x30000, 0x20800,
            0x30800, 0x20020000, 0x20030000, 0x20020800, 0x20030800);
        var pc2bytes8 = new Array(0, 0x40000, 0, 0x40000, 0x2, 0x40002, 0x2,
            0x40002, 0x2000000, 0x2040000, 0x2000000, 0x2040000, 0x2000002,
            0x2040002, 0x2000002, 0x2040002);
        var pc2bytes9 = new Array(0, 0x10000000, 0x8, 0x10000008, 0, 0x10000000,
            0x8, 0x10000008, 0x400, 0x10000400, 0x408, 0x10000408, 0x400,
            0x10000400, 0x408, 0x10000408);
        var pc2bytes10 = new Array(0, 0x20, 0, 0x20, 0x100000, 0x100020, 0x100000,
            0x100020, 0x2000, 0x2020, 0x2000, 0x2020, 0x102000, 0x102020,
            0x102000, 0x102020);
        var pc2bytes11 = new Array(0, 0x1000000, 0x200, 0x1000200, 0x200000,
            0x1200000, 0x200200, 0x1200200, 0x4000000, 0x5000000, 0x4000200,
            0x5000200, 0x4200000, 0x5200000, 0x4200200, 0x5200200);
        var pc2bytes12 = new Array(0, 0x1000, 0x8000000, 0x8001000, 0x80000,
            0x81000, 0x8080000, 0x8081000, 0x10, 0x1010, 0x8000010, 0x8001010,
            0x80010, 0x81010, 0x8080010, 0x8081010);
        var pc2bytes13 = new Array(0, 0x4, 0x100, 0x104, 0, 0x4, 0x100, 0x104, 0x1,
            0x5, 0x101, 0x105, 0x1, 0x5, 0x101, 0x105);

        // how many iterations (1 for des, 3 for triple des)
        var iterations = key.length > 8 ? 3 : 1; // changed by Paul 16/6/2007 to
        // use Triple DES for 9+ byte
        // keys
        // stores the return keys
        var keys = new Array(32 * iterations);
        // now define the left shifts which need to be done
        var shifts = new Array(0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0);
        // other variables
        var lefttemp, righttemp, m = 0, n = 0, temp;

        for (var j = 0; j < iterations; j++) { // either 1 or 3 iterations
            var left = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16)
                | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);
            var right = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16)
                | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);

            temp = ((left >>> 4) ^ right) & 0x0f0f0f0f;
            right ^= temp;
            left ^= (temp << 4);
            temp = ((right >>> -16) ^ left) & 0x0000ffff;
            left ^= temp;
            right ^= (temp << -16);
            temp = ((left >>> 2) ^ right) & 0x33333333;
            right ^= temp;
            left ^= (temp << 2);
            temp = ((right >>> -16) ^ left) & 0x0000ffff;
            left ^= temp;
            right ^= (temp << -16);
            temp = ((left >>> 1) ^ right) & 0x55555555;
            right ^= temp;
            left ^= (temp << 1);
            temp = ((right >>> 8) ^ left) & 0x00ff00ff;
            left ^= temp;
            right ^= (temp << 8);
            temp = ((left >>> 1) ^ right) & 0x55555555;
            right ^= temp;
            left ^= (temp << 1);

            // the right side needs to be shifted and to get the last four bits of
            // the left side
            temp = (left << 8) | ((right >>> 20) & 0x000000f0);
            // left needs to be put upside down
            left = (right << 24) | ((right << 8) & 0xff0000)
                | ((right >>> 8) & 0xff00) | ((right >>> 24) & 0xf0);
            right = temp;

            // now go through and perform these shifts on the left and right keys
            for (var i = 0; i < shifts.length; i++) {
                // shift the keys either one or two bits to the left
                if (shifts[i]) {
                    left = (left << 2) | (left >>> 26);
                    right = (right << 2) | (right >>> 26);
                } else {
                    left = (left << 1) | (left >>> 27);
                    right = (right << 1) | (right >>> 27);
                }
                left &= -0xf;
                right &= -0xf;

                // now apply PC-2, in such a way that E is easier when encrypting or
                // decrypting
                // this conversion will look like PC-2 except only the last 6 bits
                // of each byte are used
                // rather than 48 consecutive bits and the order of lines will be
                // according to
                // how the S selection functions will be applied: S2, S4, S6, S8,
                // S1, S3, S5, S7
                lefttemp = pc2bytes0[left >>> 28] | pc2bytes1[(left >>> 24) & 0xf]
                    | pc2bytes2[(left >>> 20) & 0xf]
                    | pc2bytes3[(left >>> 16) & 0xf]
                    | pc2bytes4[(left >>> 12) & 0xf]
                    | pc2bytes5[(left >>> 8) & 0xf]
                    | pc2bytes6[(left >>> 4) & 0xf];
                righttemp = pc2bytes7[right >>> 28]
                    | pc2bytes8[(right >>> 24) & 0xf]
                    | pc2bytes9[(right >>> 20) & 0xf]
                    | pc2bytes10[(right >>> 16) & 0xf]
                    | pc2bytes11[(right >>> 12) & 0xf]
                    | pc2bytes12[(right >>> 8) & 0xf]
                    | pc2bytes13[(right >>> 4) & 0xf];
                temp = ((righttemp >>> 16) ^ lefttemp) & 0x0000ffff;
                keys[n++] = lefttemp ^ temp;
                keys[n++] = righttemp ^ (temp << 16);
            }
        } // for each iterations
        // return the keys we've created
        return keys;
    }; // end of des_createKeys
    var genkey = function (key, start, end) {
        // 8 byte / 64 bit Key (DES) or 192 bit Key
        return {
            key: pad(key.slice(start, end)),
            vector: 1
        };
    };
    var pad = function (key) {
        for (var i = key.length; i < 24; i++) {
            key += "0";
        }
        return key;
    };

    // 3DES加密，CBC/PKCS5Padding
    var encrypt = function (input) {
        var genKey = genkey(secert_key, 0, 24);
        return btoa(des(genKey.key, input, 1, 1, des3iv, 1));
    };
    // //3DES解密，CBC/PKCS5Padding
    var decrypt = function (input) {
        var genKey = genkey(secert_key, 0, 24);
        return des(genKey.key, atob(input), 0, 1, des3iv, 1);
    };

    return {
        encrypt: encrypt,
        decrypt: decrypt
    }
}(des3iv, secert_key));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Base64 class: Base 64 encoding / decoding (c) Chris Veness 2002-2012 */
/* note: depends on Utf8 class */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Base64 = {}; // Base64 namespace

Base64.code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/**
 * Encode string into Base64, as defined by RFC 4648
 * [http://tools.ietf.org/html/rfc4648] (instance method extending String
 * object). As per RFC 4648, no newlines are added.
 *
 * @param {String}
 *            str The string to be encoded as base-64
 * @param {Boolean}
 *            [utf8encode=false] Flag to indicate whether str is Unicode string
 *            to be encoded to UTF8 before conversion to base64; otherwise
 *            string is assumed to be 8-bit characters
 * @returns {String} Base64-encoded string
 */
Base64.encode = function (str, utf8encode) { // http://tools.ietf.org/html/rfc4648
    utf8encode = (typeof utf8encode == 'undefined') ? false : utf8encode;
    var o1, o2, o3, bits, h1, h2, h3, h4, e = [], pad = '', c, plain, coded;
    var b64 = Base64.code;

    plain = utf8encode ? str.encodeUTF8() : str;

    c = plain.length % 3; // pad string to length of multiple of 3
    if (c > 0) {
        while (c++ < 3) {
            pad += '=';
            plain += '\0';
        }
    }
    // note: doing padding here saves us doing special-case packing for trailing
    // 1 or 2 chars

    for (c = 0; c < plain.length; c += 3) { // pack three octets into four
        // hexets
        o1 = plain.charCodeAt(c);
        o2 = plain.charCodeAt(c + 1);
        o3 = plain.charCodeAt(c + 2);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hextets to index into code string
        e[c / 3] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3)
            + b64.charAt(h4);
    }
    coded = e.join(''); // join() is far faster than repeated string
                        // concatenation in IE

    // replace 'A's from padded nulls with '='s
    coded = coded.slice(0, coded.length - pad.length) + pad;

    return coded;
}

/**
 * Decode string from Base64, as defined by RFC 4648
 * [http://tools.ietf.org/html/rfc4648] (instance method extending String
 * object). As per RFC 4648, newlines are not catered for.
 *
 * @param {String}
 *            str The string to be decoded from base-64
 * @param {Boolean}
 *            [utf8decode=false] Flag to indicate whether str is Unicode string
 *            to be decoded from UTF8 after conversion from base64
 * @returns {String} decoded string
 */
Base64.decode = function (str, utf8decode) {
    utf8decode = (typeof utf8decode == 'undefined') ? false : utf8decode;
    var o1, o2, o3, h1, h2, h3, h4, bits, d = [], plain, coded;
    var b64 = Base64.code;

    coded = utf8decode ? str.decodeUTF8() : str;

    for (var c = 0; c < coded.length; c += 4) { // unpack four hexets into three
        // octets
        h1 = b64.indexOf(coded.charAt(c));
        h2 = b64.indexOf(coded.charAt(c + 1));
        h3 = b64.indexOf(coded.charAt(c + 2));
        h4 = b64.indexOf(coded.charAt(c + 3));

        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

        o1 = bits >>> 16 & 0xff;
        o2 = bits >>> 8 & 0xff;
        o3 = bits & 0xff;

        d[c / 4] = String.fromCharCode(o1, o2, o3);
        // check for padding
        if (h4 == 0x40)
            d[c / 4] = String.fromCharCode(o1, o2);
        if (h3 == 0x40)
            d[c / 4] = String.fromCharCode(o1);
    }
    plain = d.join(''); // join() is far faster than repeated string
                        // concatenation in IE

    return utf8decode ? plain.decodeUTF8() : plain;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*
 * Utf8 class: encode / decode between multi-byte Unicode characters and UTF-8
 * multiple
 */
/* single-byte character encoding (c) Chris Veness 2002-2012 */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Utf8 = {}; // Utf8 namespace

/**
 * Encode multi-byte Unicode string into utf-8 multiple single-byte characters
 * (BMP / basic multilingual plane only)
 *
 * Chars in range U+0080 - U+07FF are encoded in 2 chars, U+0800 - U+FFFF in 3
 * chars
 *
 * @param {String}
 *            strUni Unicode string to be encoded as UTF-8
 * @returns {String} encoded string
 */
Utf8.encode = function (strUni) {
    // use regular expressions & String.replace callback function for better
    // efficiency
    // than procedural approaches
    var strUtf = strUni.replace(/[\u0080-\u07ff]/g, // U+0080 - U+07FF => 2
        // bytes 110yyyyy, 10zzzzzz
        function (c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xc0 | cc >> 6, 0x80 | cc & 0x3f);
        });
    strUtf = strUtf.replace(/[\u0800-\uffff]/g, // U+0800 - U+FFFF => 3 bytes
        // 1110xxxx, 10yyyyyy, 10zzzzzz
        function (c) {
            var cc = c.charCodeAt(0);
            return String.fromCharCode(0xe0 | cc >> 12, 0x80 | cc >> 6 & 0x3F,
                0x80 | cc & 0x3f);
        });
    return strUtf;
}

/**
 * Decode utf-8 encoded string back into multi-byte Unicode characters
 *
 * @param {String}
 *            strUtf UTF-8 string to be decoded back to Unicode
 * @returns {String} decoded string
 */
Utf8.decode = function (strUtf) {
    // note: decode 3-byte chars first as decoded 2-byte strings could appear to
    // be 3-byte char!
    var strUni = strUtf.replace(
        /[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, // 3-byte chars
        function (c) { // (note parentheses for precence)
            var cc = ((c.charCodeAt(0) & 0x0f) << 12)
                | ((c.charCodeAt(1) & 0x3f) << 6)
                | (c.charCodeAt(2) & 0x3f);
            return String.fromCharCode(cc);
        });
    strUni = strUni.replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, // 2-byte chars
        function (c) { // (note parentheses for precence)
            var cc = (c.charCodeAt(0) & 0x1f) << 6 | c.charCodeAt(1) & 0x3f;
            return String.fromCharCode(cc);
        });
    return strUni;
}

var MD5 = {};
/*
 * 用于生成字符串对应的md5值 @param string string 原始字符串 @return string 加密后的32位md5字符串
 */
MD5.md5 = function (string) {
    function md5_RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function md5_AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function md5_F(x, y, z) {
        return (x & y) | ((~x) & z);
    }

    function md5_G(x, y, z) {
        return (x & z) | (y & (~z));
    }

    function md5_H(x, y, z) {
        return (x ^ y ^ z);
    }

    function md5_I(x, y, z) {
        return (y ^ (x | (~z)));
    }

    function md5_FF(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d),
            x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }
    ;

    function md5_GG(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d),
            x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }
    ;

    function md5_HH(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d),
            x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }
    ;

    function md5_II(a, b, c, d, x, s, ac) {
        a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d),
            x), ac));
        return md5_AddUnsigned(md5_RotateLeft(a, s), b);
    }
    ;

    function md5_ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string
                .charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount]
            | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }
    ;

    function md5_WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue
                + WordToHexValue_temp.substr(
                    WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    }
    ;

    function md5_Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    }
    ;
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    string = md5_Utf8Encode(string);
    x = md5_ConvertToWordArray(string);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
    for (k = 0; k < x.length; k += 16) {
        AA = a;
        BB = b;
        CC = c;
        DD = d;
        a = md5_FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = md5_FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = md5_FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = md5_FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = md5_FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = md5_FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = md5_FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = md5_FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = md5_FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = md5_GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = md5_GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = md5_GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = md5_GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = md5_GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = md5_GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = md5_GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = md5_GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = md5_GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = md5_GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = md5_HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = md5_HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = md5_HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = md5_HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = md5_HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = md5_HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = md5_HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = md5_HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = md5_HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = md5_HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = md5_II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = md5_II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = md5_II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = md5_II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = md5_II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = md5_II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = md5_II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = md5_II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = md5_II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = md5_II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = md5_II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = md5_II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = md5_II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = md5_II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = md5_II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = md5_AddUnsigned(a, AA);
        b = md5_AddUnsigned(b, BB);
        c = md5_AddUnsigned(c, CC);
        d = md5_AddUnsigned(d, DD);
    }
    return (md5_WordToHex(a) + md5_WordToHex(b) + md5_WordToHex(c) + md5_WordToHex(d))
        .toLowerCase();
}


var utils = (function ($) {
    //获取连接中的参数
    var getQueryStr = function (name) {
        var url = location.href;
        var rs = new RegExp("(^|)" + name + "=([^\&]*)(\&|$|#)", "gi").exec(url),
            tmp;
        if (tmp = rs) {
            return tmp[2];
        }
        return "";
    };
    var changeParam = function (name, value) {

        var url = window.location.href;
        var newUrl = "";

        var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
        var tmp = name + "=" + value;
        if (url.match(reg) != null) {
            newUrl = url.replace(eval(reg), tmp);
        } else {
            if (url.match("[\?]")) {
                newUrl = url + "&" + tmp;
            } else {
                newUrl = url + "?" + tmp;
            }
        }

        location.href = newUrl;
    };
    var changeParams = function (url, name, value) {

        var newUrl = "";

        var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
        var tmp = name + "=" + value;
        if (url.match(reg) != null) {
            newUrl = url.replace(eval(reg), tmp);
        } else {
            if (url.match("[\?]")) {
                newUrl = url + "&" + tmp;
            } else {
                newUrl = url + "?" + tmp;
            }
        }

        return newUrl;
    };


    var formatDate = function (pattern, date) {
        //如果不设置，默认为当前时间  
        if (!date) date = new Date();
        if (typeof(date) === "string") {
            if (date == "") date = new Date();
            else date = new Date(date.replace(/-/g, "/"));
        }
        /*补00*/
        var toFixedWidth = function (value) {
            var result = 100 + value;
            return result.toString().substring(1);
        };

        /*配置*/
        var options = {
            regeExp: /(yyyy|M+|d+|h+|m+|s+|ee+|ws?|p)/g,
            months: ['January', 'February', 'March', 'April', 'May',
                'June', 'July', 'August', 'September',
                'October', 'November', 'December'],
            weeks: ['Sunday', 'Monday', 'Tuesday',
                'Wednesday', 'Thursday', 'Friday',
                'Saturday']
        };

        /*时间切换*/
        var swithHours = function (hours) {
            return hours < 12 ? "AM" : "PM";
        };

        /*配置值*/
        var pattrnValue = {
            "yyyy": date.getFullYear(),                      //年份  
            "MM": toFixedWidth(date.getMonth() + 1),           //月份  
            "dd": toFixedWidth(date.getDate()),              //日期  
            "hh": toFixedWidth(date.getHours()),             //小时  
            "mm": toFixedWidth(date.getMinutes()),           //分钟  
            "ss": toFixedWidth(date.getSeconds()),           //秒  
            "ee": options.months[date.getMonth()],           //月份名称  
            "ws": options.weeks[date.getDay()],              //星期名称  
            "M": date.getMonth() + 1,
            "d": date.getDate(),
            "h": date.getHours(),
            "m": date.getMinutes(),
            "s": date.getSeconds(),
            "p": swithHours(date.getHours())
        };

        return pattern.replace(options.regeExp, function () {
            return pattrnValue[arguments[0]];
        });
    };


    var toTimestamp = function (datetime) {
        var date = new Date(datetime.toString().replace(/-/g, "/"));
        var humanDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date
            .getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
        return humanDate.getTime() / 1000 - 28800;
    }
    var toDate = function (timestamp) {
        var timestamp = new Date(timestamp * 1000);
        return utils.formatDate('yyyy-MM-dd hh:mm:ss', timestamp);
//		return timestamp.format("yyyy-MM-dd hh:mm:ss");
    }
    /**
     * 对时间进行加/减numOfDays天
     */
    var adjustDate = function (datetime, numOfDays, pattern) {
        var currentDate = new Date(datetime.toString().replace(/-/g, "/"));
        currentDate.setDate(currentDate.getDate() + numOfDays);
        if (!pattern) pattern = 'yyyy-MM-dd hh:mm:ss';
        return utils.formatDate(pattern, currentDate);
    }


    //trackId格式{16位MD5(UID)-Base64(uid)-Base64(seq)-Base64(时间戳)}，存放在cookie中
    //根据trackId中的时间戳，判断用户是否差不多过期
    var isExpire = function () {
        var trackId = $.cookie("trackId");
        var timestamp;
        if (trackId == null || trackId == "") {
//			alert("cookie已经过期");
            return false;
        } else {
            timestamp = base64decode(trackId.split("-")[3]);
            var date = toDate(timestamp);
            //var d = date.format("yyyy-MM-dd HH:mm:ss");
            var n = new Date() - new Date(date);//n为相差的毫秒
            //alert("data:"+date+" now:"+now+"相差:"+n);
            if (n < 300000) {//如果时间相差小于5分钟，返回需要验证标签
                return true;
            } else {//时间相差大于5分钟
                return false;
            }
        }
    }


    var download = function (url, obj) {
        $("#download-form").remove();
//		$("#download-iframe").remove();
        var form = $("<form id='download-form'></form>");//定义一个form表单
//		var iframe = $("<iframe id='download-iframe'></iframe>")
//		iframe.attr("style","display:none");
        form.attr("style", "display:none");
        form.attr("target", "");
        form.attr("method", "get");
        form.attr("action", url);
        obj.trackId = $.cookie("trackId");
        obj.uuid = $.cookie("aduuid");
        $("body").append(form);//将表单放置在web中
        for (var key in obj) {
            var tmp = $("<input>");
            tmp.attr("name", key);
            tmp.attr("value", obj[key]);
            form.append(tmp);
        }
        form.submit();//表单提交 
    }

    var addParam2Url = function (url, name, value) {
        var currentUrl = url.split('#')[0];
        if (/\?/g.test(currentUrl)) {
            if (eval('/' + name + '=[-\\w]{1,25}/g').test(currentUrl)) {
                currentUrl = currentUrl.replace(eval('/' + name + '=[-\\w]{1,25}/g'), name + "=" + value);
            } else {
                currentUrl += "&" + name + "=" + value;
            }
        } else {
            currentUrl += "?" + name + "=" + value;
        }
        return currentUrl;
    }

    var limitInputEnCn = function (id) {
        $("#" + id).on("keyup", function () {
            var value = $("#" + id).val();
            $("#" + id).val(value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g, ""));
        });
    }

    var limitInputFloat = function (id) {
        $("#" + id).on("keyup", function () {
            var value = $("#" + id).val();
            if ('' != value.replace(/\d{1,}\.{0,1}\d{0,}/, '')) {
                $("#" + id).val(value.match(/\d{1,}\.{0,1}\d{0,}/) == null ? '' : value.match(/\d{1,}\.{0,1}\d{0,}/));
            }
        });


    }

    var limitInputCn = function (id, noticeId, noClean) {
        $("#" + id).on("change", function () {
            var value = $("#" + id).val();
            if (noticeId) {
                var reg = /[^a-zA-Z0-9]*/g;
                if (value.match(reg)) {
                    $("#" + noticeId).show();
                }
            }
            if (noClean) {
                return;
            }
            $("#" + id).val(value.replace(/[^\u4E00-\u9FA5]/g, ""));
        });
    }
    var limitInputNum = function (id) {
        $("#" + id).on("keyup", function () {
            var value = $("#" + id).val();
            $("#" + id).val(value.replace(/[^0-9]/g, ""));
        });
    }

    var limitInputEnNum = function (id) {
        $("#" + id).on("keyup", function () {
            var value = $("#" + id).val();
            $("#" + id).val(value.replace(/[^\a-\z\A-\Z0-9]/g, ""));
        });
    }

    var limitInputEnCnNum = function (id) {
        $("#" + id).on("keyup", function () {
            var value = $("#" + id).val();
            $("#" + id).val(value.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g, ""));
        });
    }

    var truncAndEllipsis = function (str, len) {
        var finalStrLen = 0;
        var finalStr = "";

        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 128) {
                finalStrLen += 2;
            } else {
                finalStrLen++;
            }
            finalStr += str.charAt(i);
            if (finalStrLen >= len) {
                return finalStr + "...";
            }
        }
        return finalStr;

    }

    var getImgData = function (img, dir, next) {
        var image = new Image();
        image.onload = function () {
            var degree = 0, drawWidth, drawHeight, width, height;
            drawWidth = this.naturalWidth;
            drawHeight = this.naturalHeight;
            //以下改变一下图片大小
            var maxSide = Math.max(drawWidth, drawHeight);
            if (maxSide > 1024) {
                var minSide = Math.min(drawWidth, drawHeight);
                minSide = minSide / maxSide * 1024;
                maxSide = 1024;
                if (drawWidth > drawHeight) {
                    drawWidth = maxSide;
                    drawHeight = minSide;
                } else {
                    drawWidth = minSide;
                    drawHeight = maxSide;
                }
            }
            var canvas = document.createElement('canvas');
            canvas.width = width = drawWidth;
            canvas.height = height = drawHeight;
            var context = canvas.getContext('2d');
            //判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
            switch (dir) {
                //iphone横屏拍摄，此时home键在左侧
                case 3:
                    degree = 180;
                    drawWidth = -width;
                    drawHeight = -height;
                    break;
                //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
                case 6:
                    canvas.width = height;
                    canvas.height = width;
                    degree = 90;
                    drawWidth = width;
                    drawHeight = -height;
                    break;
                //iphone竖屏拍摄，此时home键在上方
                case 8:
                    canvas.width = height;
                    canvas.height = width;
                    degree = 270;
                    drawWidth = -width;
                    drawHeight = height;
                    break;
            }
            //使用canvas旋转校正
            context.rotate(degree * Math.PI / 180);
            context.drawImage(this, 0, 0, drawWidth, drawHeight);
            //返回校正图片
            next(canvas.toDataURL("image/jpeg", .8));
        }
        image.src = img;
    }

    var getMessageList = function (param) {
        var msgTypeList = null;
        common.ajax('GET', '/app/user/msg/type-list', null, function (respBody) {
            if (respBody) {
                msgTypeList = respBody.msgTypeList;
                var hasReadMessage = localStorage.getItem('hasReadMessage');
                // hasReadMessage = '{"1":[10001,10000],"2":[10003,10010],"3":[10009,10010]}';
                var msgTypeListReturn = [];
                var msgTypeListItem = {};
                if (hasReadMessage && hasReadMessage.length > 0) {
                    var hasReadMessageObj = JSON.parse(hasReadMessage);
                    for (var i = 0; i < msgTypeList.length; i++) {
                        msgTypeListItem = msgTypeList[i];
                        var type = msgTypeList[i].type;
                        if (hasReadMessageObj[type + '']) {
                            msgTypeListItem.hasReadMessage = arrayIntersect2(msgTypeList[i]['ids'], hasReadMessageObj[type]);
                        } else {
                            msgTypeListItem.hasReadMessage = [];
                        }
                        msgTypeListReturn.push(msgTypeListItem);
                    }
                    //更新 localStorage
                    hasReadMessage = {};
                    for (var i = 0; i < msgTypeListReturn.length; i++) {
                        if (msgTypeListReturn[i].hasReadMessage && msgTypeListReturn[i].hasReadMessage.length > 0) {
                            hasReadMessage[msgTypeListReturn[i].type + ''] = msgTypeListReturn[i].hasReadMessage;
                        }
                    }
                    localStorage.setItem('hasReadMessage', JSON.stringify(hasReadMessage));
                } else {
                    for (var i = 0; i < msgTypeList.length; i++) {
                        msgTypeListItem = msgTypeList[i];
                        msgTypeListItem.hasReadMessage = [];
                        msgTypeListReturn.push(msgTypeListItem);
                    }
                }
                // console.log(msgTypeListReturn);
                if (param.mark == 'index') {
                    index.hasNoReadMessage(msgTypeListReturn);
                } else if (param.mark == 'member-center') {
                    userIndex.hasNoReadMessage(msgTypeListReturn);
                } else if (param.mark == 'message-center') {
                    _messageCenter.loadData(msgTypeListReturn);
                }
            }
        })
    }

    var updateHasReadMessage = function (type, ids) {
        var hasReadMessage = localStorage.getItem('hasReadMessage');
        if (hasReadMessage && hasReadMessage.length > 0) {
            hasReadMessage = JSON.parse(hasReadMessage);
            hasReadMessage[type] = ids;
        } else {
            hasReadMessage = {};
            hasReadMessage[type] = ids;
        }
        localStorage.setItem('hasReadMessage', JSON.stringify(hasReadMessage));
    }

    var arrayIntersect2 = function (a, b) {
        var c = [];
        for (var i in a) {
            for (var j in b) {
                if (a[i] === b[j]) {
                    c.push(a[i]);
                }
            }
        }
        return c;
    }
    var arrayIntersect = function (a, b) {
        var ai = 0, bi = 0;
        var result = new Array();
        while (ai < a.length && bi < b.length) {
            if (a[ai] < b[bi]) {
                ai++;
            }
            else if (a[ai] > b[bi]) {
                bi++;
            }
            else /* they're equal */
            {
                result.push(a[ai]);
                ai++;
                bi++;
            }
        }
        return result;
    }

    return {
        getQueryStr: getQueryStr,//获取页面URL参数的值
        changeParam: changeParam,//改变页面URL参数的值，没有则新增参数，并重定向页面。
        changeParams: changeParams,//改名页面URL的参数值，没有则新增参数，返回新的URL。
        formatDate: formatDate,//格式化日期，具体用法utils.formatDate("yyyy-MM-dd",date);

        toTimestamp: toTimestamp,//将日期转换成Timestamp类型
        toDate: toDate,//将timestap型的日期转换为日期类型
        adjustDate: adjustDate,//加减时间
        isExpire: isExpire,//检查cookie是否过期
        download: download, //js下载方法，url为下载地址，obj为入参，具体使用utils.download(url,{username:1111,pwd:2222})
        addParam2Url: addParam2Url, //向URL中添加参数
        limitInputEnCn: limitInputEnCn, //限制输入框只能输入中英文,使用limitInputEnCn(id)
        limitInputNum: limitInputNum, //限制输入框只能输入数字 使用limitInputNum(id)
        limitInputEnCnNum: limitInputEnCnNum, //限制输入框只能输入中英文和数字
        limitInputEnNum: limitInputEnNum, //限制输入框输入英文和数字
        truncAndEllipsis: truncAndEllipsis,
        limitInputCn: limitInputCn, //限制输入框只能输入中文,使用limitInputCn(id)
        limitInputFloat: limitInputFloat,//限制输入框只能输入数值
        getImgData: getImgData, // 获取图片各种数据
        getMessageList: getMessageList,
        updateHasReadMessage: updateHasReadMessage
    }
})(window.jQuery || $);
