// For testing cross-language PB data to make sure we're producing the same thing
// `go get github.com/ipfs/go-merkledag`
// `go run pb-cross-language.go`
/*
pnd1 cid: QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n, size: 0
pnd2 cid: QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n, size: 0
pnd3 cid: QmdfTbBqBPQ7VNxZEYEj14VmRuZBkqFbiwReogJgS1zR1n, size: 0
pnd1 cid: QmdwjhxpxzcMsR3qUuj7vUL8pbA7MgR3GAxWi2GLHjsKCT, size: 51
pnd2 cid: QmWXZxVQ9yZfhQxLD35eDR8LiMRsYtHxYqTFCBbJoiJVys, size: 149
pnd3 cid: QmNX6Tffavsya4xgBi2VJQnSuqy9GsxongxZZ9uZBqp16d, size: 250
*/

// based on test data from https://github.com/ipfs/go-car

package main

import (
	"fmt"

	dag "github.com/ipfs/go-merkledag"
)

func main() {
	var rnd1 = dag.NewRawNode([]byte("aaaa"))
	var rnd2 = dag.NewRawNode([]byte("bbbb"))
	var rnd3 = dag.NewRawNode([]byte("cccc"))

	var pnd1 = &dag.ProtoNode{}
	var pnd2 = &dag.ProtoNode{}
	var pnd3 = &dag.ProtoNode{}

	sizer := func(pnd *dag.ProtoNode) (size uint64) { size, _ = pnd.Size(); return size }

	fmt.Printf("pnd1 cid: %s, size: %d\n", pnd1.Cid(), sizer(pnd1))
	fmt.Printf("pnd2 cid: %s, size: %d\n", pnd2.Cid(), sizer(pnd2))
	fmt.Printf("pnd3 cid: %s, size: %d\n", pnd3.Cid(), sizer(pnd3))

	pnd1.AddNodeLink("cat", rnd1)
	pnd2.AddNodeLink("first", pnd1)
	pnd2.AddNodeLink("dog", rnd2)
	pnd3.AddNodeLink("second", pnd2)
	pnd3.AddNodeLink("bear", rnd3)

	fmt.Printf("pnd1 cid: %s, size: %d\n", pnd1.Cid(), sizer(pnd1))
	fmt.Printf("pnd2 cid: %s, size: %d\n", pnd2.Cid(), sizer(pnd2))
	fmt.Printf("pnd3 cid: %s, size: %d\n", pnd3.Cid(), sizer(pnd3))
}
