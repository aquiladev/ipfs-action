/* eslint-env mocha */

import chai from 'chai'
import { exec } from 'child_process'
import process from 'process'
import path from 'path'
import { fileURLToPath } from 'url'
// included here for ipjs compile tree
import bin from '../lib/bin.js' // eslint-disable-line

const { assert } = chai

const binPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '../lib/bin.js')

function fromHex (hex) {
  return new Uint8Array(hex.split('')
    .map((/** @type {string} */ c, /** @type {number} */ i, /** @type {string[]} */ d) => i % 2 === 0 ? `0x${c}${d[i + 1]}` : '')
    .filter(Boolean)
    .map((/** @type {string} */ e) => parseInt(e, 16)))
}

async function execBin (cmd, stdin) {
  return new Promise((resolve, reject) => {
    const cp = exec(`"${process.execPath}" "${binPath}" ${cmd}`, (err, stdout, stderr) => {
      if (err) {
        err.stdout = stdout
        err.stderr = stderr
        return reject(err)
      }
      resolve({ stdout, stderr })
    })
    if (stdin != null) {
      cp.on('spawn', () => {
        cp.stdin.write(stdin)
        cp.stdin.end()
      })
    }
  })
}

describe('Bin', () => {
  it('usage', async () => {
    try {
      await execBin('')
      assert.fail('should have errored')
    } catch (e) {
      assert.strictEqual(e.stdout, '')
      assert.strictEqual(e.stderr,
`Usage: cborg <command> <args>
Valid commands:
\thex2diag [hex input]
\thex2bin [hex input]
\thex2json [--pretty] [hex input]
\tbin2hex [binary input]
\tbin2diag [binary input]
\tbin2json [--pretty] [binary input]
\tjson2hex '[json input]'
\tjson2diag '[json input]'
\tjson2bin '[json input]'
Input may either be supplied as an argument or piped via stdin
`)
    }
  })

  it('bad cmd', async () => {
    try {
      await execBin('blip')
      assert.fail('should have errored')
    } catch (e) {
      assert.strictEqual(e.stdout, '')
      assert.strictEqual(e.stderr,
`Unknown command: 'blip'
Usage: cborg <command> <args>
Valid commands:
\thex2diag [hex input]
\thex2bin [hex input]
\thex2json [--pretty] [hex input]
\tbin2hex [binary input]
\tbin2diag [binary input]
\tbin2json [--pretty] [binary input]
\tjson2hex '[json input]'
\tjson2diag '[json input]'
\tjson2bin '[json input]'
Input may either be supplied as an argument or piped via stdin
`)
    }
  })

  it('help', async () => {
    const { stdout, stderr } = await execBin('help')
    assert.strictEqual(stdout, '')
    assert.strictEqual(stderr,
`Usage: cborg <command> <args>
Valid commands:
\thex2diag [hex input]
\thex2bin [hex input]
\thex2json [--pretty] [hex input]
\tbin2hex [binary input]
\tbin2diag [binary input]
\tbin2json [--pretty] [binary input]
\tjson2hex '[json input]'
\tjson2diag '[json input]'
\tjson2bin '[json input]'
Input may either be supplied as an argument or piped via stdin
`)
  })

  for (const stdin of [true, false]) {
    it(`hex2json${stdin ? ' (stdin)' : ''}`, async () => {
      const { stdout, stderr } = stdin
        ? await execBin('hex2json a3616101616282020365736d696c6564f09f9880')
        : await execBin('hex2json', 'a3616101616282020365736d696c6564f09f9880')
      assert.strictEqual(stderr, '')
      assert.strictEqual(stdout, '{"a":1,"b":[2,3],"smile":"😀"}\n')
    })

    it(`hex2json pretty${stdin ? ' (stdin)' : ''}`, async () => {
      const { stdout, stderr } = stdin
        ? await execBin('hex2json --pretty a3616101616282020365736d696c6564f09f9880')
        : await execBin('hex2json --pretty', 'a3616101616282020365736d696c6564f09f9880')
      assert.strictEqual(stderr, '')
      assert.strictEqual(stdout,
`{
  "a": 1,
  "b": [
    2,
    3
  ],
  "smile": "😀"
}
`)
    })

    it(`hex2diag${stdin ? ' (stdin)' : ''}`, async () => {
      const { stdout, stderr } = stdin
        ? await execBin('hex2diag a4616101616282020363627566440102036165736d696c6564f09f9880')
        : await execBin('hex2diag', 'a4616101616282020363627566440102036165736d696c6564f09f9880')
      assert.strictEqual(stderr, '')
      assert.strictEqual(stdout,
`a4                                                # map(4)
  61                                              #   string(1)
    61                                            #     "a"
  01                                              #   uint(1)
  61                                              #   string(1)
    62                                            #     "b"
  82                                              #   array(2)
    02                                            #     uint(2)
    03                                            #     uint(3)
  63                                              #   string(3)
    627566                                        #     "buf"
  44                                              #   bytes(4)
    01020361                                      #     "\\x01\\x02\\x03a"
  65                                              #   string(5)
    736d696c65                                    #     "smile"
  64 f09f                                         #   string(2)
    f09f9880                                      #     "😀"
`)
    })

    it(`hex2bin${stdin ? ' (stdin)' : ''}`, async () => {
      const { stdout, stderr } = stdin
        ? await execBin('hex2bin a3616101616282020365736d696c6564f09f9880')
        : await execBin('hex2bin', 'a3616101616282020365736d696c6564f09f9880')
      assert.strictEqual(stderr, '')
      assert.strictEqual(stdout, new TextDecoder().decode(fromHex('a3616101616282020365736d696c6564f09f9880')))
    })

    it(`json2hex${stdin ? ' (stdin)' : ''}`, async () => {
      const { stdout, stderr } = stdin
        ? await execBin('json2hex "{\\"a\\":1,\\"b\\":[2,3],\\"smile\\":\\"😀\\"}"')
        : await execBin('json2hex', '{"a":1,"b":[2,3],"smile":"😀"}')
      assert.strictEqual(stderr, '')
      assert.strictEqual(stdout, 'a3616101616282020365736d696c6564f09f9880\n')
    })

    it(`json2bin${stdin ? ' (stdin)' : ''}`, async () => {
      const { stdout, stderr } = stdin
        ? await execBin('json2bin "{\\"a\\":1,\\"b\\":[2,3],\\"smile\\":\\"😀\\"}"')
        : await execBin('json2bin', '{"a":1,"b":[2,3],"smile":"😀"}')
      assert.strictEqual(stderr, '')
      assert.strictEqual(stdout, new TextDecoder().decode(fromHex('a3616101616282020365736d696c6564f09f9880')))
    })

    it(`json2diag${stdin ? ' (stdin)' : ''}`, async () => {
      const { stdout, stderr } = stdin
        ? await execBin('json2diag "{\\"a\\":1,\\"b\\":[2,3],\\"smile\\":\\"😀\\"}"')
        : await execBin('json2diag', '{"a":1,"b":[2,3],"smile":"😀"}')
      assert.strictEqual(stderr, '')
      assert.strictEqual(stdout,
`a3                                                # map(3)
  61                                              #   string(1)
    61                                            #     "a"
  01                                              #   uint(1)
  61                                              #   string(1)
    62                                            #     "b"
  82                                              #   array(2)
    02                                            #     uint(2)
    03                                            #     uint(3)
  65                                              #   string(5)
    736d696c65                                    #     "smile"
  64 f09f                                         #   string(2)
    f09f9880                                      #     "😀"
`)
    })
  }

  it('bin2diag (stdin)', async () => {
    const { stdout, stderr } = await execBin('bin2diag', fromHex('a3616101616282020365736d696c6564f09f9880'))
    assert.strictEqual(stderr, '')
    assert.strictEqual(stdout,
`a3                                                # map(3)
  61                                              #   string(1)
    61                                            #     "a"
  01                                              #   uint(1)
  61                                              #   string(1)
    62                                            #     "b"
  82                                              #   array(2)
    02                                            #     uint(2)
    03                                            #     uint(3)
  65                                              #   string(5)
    736d696c65                                    #     "smile"
  64 f09f                                         #   string(2)
    f09f9880                                      #     "😀"
`)
  })

  it('bin2json (stdin)', async () => {
    const { stdout, stderr } = await execBin('bin2json', fromHex('a3616101616282020365736d696c6564f09f9880'))
    assert.strictEqual(stderr, '')
    assert.strictEqual(stdout, '{"a":1,"b":[2,3],"smile":"😀"}\n')
  })

  it('bin2json pretty (stdin)', async () => {
    const { stdout, stderr } = await execBin('bin2json --pretty', fromHex('a3616101616282020365736d696c6564f09f9880'))
    assert.strictEqual(stderr, '')
    assert.strictEqual(stdout,
`{
  "a": 1,
  "b": [
    2,
    3
  ],
  "smile": "😀"
}
`)
  })

  it('bin2hex (stdin)', async () => {
    const { stdout, stderr } = await execBin('bin2hex', fromHex('a3616101616282020365736d696c6564f09f9880'))
    assert.strictEqual(stderr, '')
    assert.strictEqual(stdout, 'a3616101616282020365736d696c6564f09f9880\n')
  })
})
