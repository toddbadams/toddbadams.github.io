/*
* tbaBinaryTree - Version 1.0
* Oct 31, 2012 - Inital Build
*
* This jQuery plugin and its content is copyright of Todd B. Adams 
* © Todd B. Adams 2012. All rights reserved.
*
* Any redistribution or reproduction of part or all of the contents in 
* any form is prohibited.
*
* http://www.toddbadams.co.uk/
*/

function tbaBinaryTree() {
    // store this object
    var self = this;

    // enum of tree types
    self.TreeTypeEnum = {
        B: "Binary Tree",
        BST: "Binary Search Tree",
        AVL: "AVL Tree",
        RBTop: "Red Black Top Down",
        RBBottom: "Red Black Bottom Up"
    }

    // options   
    self.TreeType = self.TreeTypeEnum.BST;
    self.MaxTreeHeight = 20;
    self.LineWidth = 1;
    self.Color = 'black';
    self.CanvasFill = 'white';
    self.NodeRadius = 1;

    // jQuery elements
    self.$GenerateBtn = $('#generate-button');
    self.$GenerateTab = $('#generate-tab');
    self.$NumberNodes = $('#nodes');
    self.$MaxKeyValue = $('#key-values');
    self.$KeysTab = $('#keys-holder');
    self.$GraphTab = $('#graph-tab');
    self.$Canvas = $('#canvas');
    self.$DeGenerateBtn = $('#degenerate-button');
    self.$DeGenerateTab = $('#degenerate-tab');
    self.$DegenerationSteps = $('#degeneration-steps');
    self.$GraphTabBtn = $('#graph-tab-btn');
    self.$KeysTabBtn = $('#keys-tab-btn');
    self.$Depth = $('#tree-depth');

    // The canvas settings
    self.Canvas = new Object();
    self.Canvas.DomElement = document.getElementById('canvas');
    self.Canvas.Width = $(document).width();
    self.Canvas.Height = $(document).height();
    self.Canvas.Empty = function () {
        self.Canvas.Context.fillStyle = self.CanvasFill;
        self.Canvas.Context.fillRect(0, 0, self.Canvas.Width, self.Canvas.Height);
    }
    self.Canvas.Context = self.Canvas.DomElement.getContext('2d');
    self.Canvas.DomElement.width = self.Canvas.Width;
    self.Canvas.DomElement.height = self.Canvas.Height;

    self.Keys = {
        Values: null,
        Nodes: null,
        Root: null,
        Length: 100,
        MaxValue: 1000,
        Depth: 0,
        Init: function () {
            // get from html form
            self.Keys.Length = parseInt(self.$NumberNodes.val());
            self.Keys.MaxValue = parseInt(self.$MaxKeyValue.val());

            self.Keys.Depth = 0;

            // empty if required
            if (self.Keys.Nodes != null) self.Keys.Empty();
            if (self.Keys.Values != null) self.Keys.Empty();

            // setup new arrays
            self.Keys.Values = new Array(self.Keys.Length);
            self.Keys.Nodes = new Array(self.Keys.Length);

            // create array of sequential random values
            var j = 0;
            for (i = 0; i < self.Keys.MaxValue; i++) {
                if (Math.round((Math.random() * self.Keys.MaxValue - i)) < self.Keys.Length - j) {
                    self.Keys.Values[j] = i;
                    j++;
                }
                if (j >= self.Keys.Length) break;
            }

            // randomly sort the array
            self.Keys.Values = self.Keys.Values.sort(function () {
                if (Math.random() > 0.5) return 1;
                return -1
            });

            // Build our root
            self.Keys.Root = new Node(null, self.Keys.Values[0]);
            self.Keys.Nodes[0] = self.Keys.Root;

            // Build our nodes
            for (var j = 1; j < self.Keys.Length; j++) {
                self.Keys.Nodes[j] = self.Keys.Root.Insert(self.Keys.Values[j]);
                if (self.Keys.Nodes[j].Height() > self.Keys.Depth) self.Keys.Depth = self.Keys.Nodes[j].Height();
            }
        },
        Empty: function () {
            for (var i = 0; i < self.Length; i++) {
                if (Nodes[i] != null) delete Nodes[i];
            }
            delete self.Values;
            delete self.Nodes;
        },
        OutputKeys: function () {
            var html = self.Keys.Values[0];
            for (var i = 1; i < self.Keys.Length; i++) {
                html += ", " + self.Keys.Values[i].toString();
            }
            self.$KeysTab.html(html);
        },
        OutputDepth: function() {
            var bestCase = Math.ceil( Math.log(self.Keys.Length) / Math.log(2) ) + 1;
            self.$Depth.html("tree depth = " + self.Keys.Depth.toString() +
                "<br/>best case tree depth = " + bestCase.toString());
        },
        DegnerateOne: function () {
            // create a random key
            var newKey = Math.floor(Math.random() * self.Keys.MaxValue);

            // find a random location in our keyValues array
            var index = Math.floor(Math.random() * self.Keys.Length);

            // remove this key from the tree
            self.Keys.Nodes[index].Delete(self.Keys.Values[index]);

            // insert new key into the tree
            self.Keys.Nodes[index] = self.Keys.Root.Insert(newKey);
            if (self.Keys.Nodes[index].Height() > self.Keys.Depth) self.Keys.Depth = self.Keys.Nodes[index].Height();
            self.Keys.Values[index] = newKey;
        },
        DegnerateMany: function () {

            var steps = parseInt(self.$DegenerationSteps.val());
            for (var i = 0; i < steps; i++) {
                self.Keys.DegnerateOne();
            }
        }
    }

    //=============================================================		
    // Node class
    //=============================================================		
    function Node(parent, value) {
        this.Parent = parent;
        this.Value = value;
        this.RNode = null;
        this.LNode = null;

        if (this.Parent == null) {
            this.XGridSize = self.Canvas.Width / 2;
            this.Y = 0;
            this.X = self.Canvas.Width / 2;
        } else {
            this.XGridSize = 0.5 * this.Parent.XGridSize;
            this.Y = this.Parent.Y + self.Canvas.Height / self.MaxTreeHeight;
            if (value > this.Parent.Value) {
                this.X = this.Parent.X + this.XGridSize;
            } else {
                this.X = this.Parent.X - this.XGridSize;
            }
        }
    };

    // Preorder Draw (Visit, Left, Right)
    Node.prototype.DrawPreOrder = function () {
        this.DrawNode();
        if (this.LNode != null) {
            this.DrawEdge(this.LNode);
            this.LNode.DrawPreOrder();
        }
        if (this.RNode != null) {
            this.DrawEdge(this.RNode);
            this.RNode.DrawPreOrder();
        }
    };

    // Draw a circular node
    Node.prototype.DrawNode = function () {
        self.Canvas.Context.arc(this.X, this.Y, self.NodeRadius, 0, 2 * Math.PI);
        self.Canvas.Context.fillStyle = self.Color;
        self.Canvas.Context.fill();
    };

    // Draw the edge to a given node
    Node.prototype.DrawEdge = function (node) {
        // need to move the x based on max height
        self.Canvas.Context.beginPath();
        self.Canvas.Context.moveTo(this.X, this.Y);
        self.Canvas.Context.lineTo(node.X, node.Y);
        self.Canvas.Context.lineWidth = self.LineWidth;
        self.Canvas.Context.strokeStyle = self.Color;
        self.Canvas.Context.stroke();
        if (node.Y > self.Canvas.Height)
            self.Canvas.DomElement.height = node.Y + 20;
    };

    // Insert a value into the tree node	
    Node.prototype.Insert = function (value) {
        if (value != this.Value)
            switch (self.TreeType) {
                case self.TreeTypeEnum.B: return this.BInsert(value);
                case self.TreeTypeEnum.BST: return this.BSTInsert(value);
                case self.TreeTypeEnum.AVL: break;
                case self.TreeTypeEnum.RBTop: break;
                case self.TreeTypeEnum.RBBottom:
            }
        return this;
    };

    // Binary Tree Insert
    Node.prototype.BInsert = function (value) {
        if (Math.random() > 0.5)
            return this.AddRight(value);
        else
            return this.AddLeft(value);
    }

    // Binary Search Tree Insert
    Node.prototype.BSTInsert = function (value) {
        if (value > this.Value)
            return this.AddRight(value);
        else
            return this.AddLeft(value);
    }

    // add a value to the right
    Node.prototype.AddRight = function (value) {
        if (this.RNode == null) {
            this.RNode = new Node(this, value);
            return this.RNode;
        }
        return this.RNode.Insert(value);
    };

    // add a value to the left
    Node.prototype.AddLeft = function (value) {
        if (this.LNode == null) {
            this.LNode = new Node(this, value);
            return this.LNode;
        }
        return this.LNode.Insert(value);
    };

    // Get the maximum value in this node subtree
    Node.prototype.Max = function () {
        if (this.RNode == null) {
            return this.Value;
        } else {
            return this.RNode.Max();
        }
    };

    // Get the minimum value in this node subtree
    Node.prototype.Min = function () {
        if (this.LNode == null) {
            return this.Value;
        } else {
            return this.LNode.Max();
        }
    };

    // Delete a value from the subtree
    Node.prototype.Delete = function (value) {
        switch (self.TreeType) {
            case self.TreeTypeEnum.B: break;
            case self.TreeTypeEnum.BST: return this.BSTDelete(value);
            case self.TreeTypeEnum.AVL: break;
            case self.TreeTypeEnum.RBTop: break;
            case self.TreeTypeEnum.RBBottom:
        }
        return this;
    }

    // Delete a value from the subtree
    Node.prototype.DeleteSubtree = function (value) {
        if (this.LNode != null) this.LNode.DeleteSubtree();
        if (this.RNode != null) this.RNode.DeleteSubtree();
        this.Delete();
    }

    // Delete a value from the BST node	
    Node.prototype.BSTDelete = function (value) {
        // not this node
        if (value > this.Value && this.RNode != null)
            return this.RNode.Delete(value);
        if (value < this.Value && this.LNode != null)
            return this.LNode.Delete(value);
        if (value != this.Value) return false;

        // this is a leaf
        if (this.LNode == null && this.RNode == null) {
            if (value > this.Parent)
                this.Partent.RNode = null;
            else
                this.Parent.LNode = null;
            delete this;
            return true;
        }

        // not a leaf, but only child is on right
        if (this.LNode == null && this.RNode != null)
            return this.DeleteandReplaceWithRightNode();

        // not a leaf, but only child is on left
        if (this.LNode != null && this.RN == null)
            return this.DeleteandReplaceWithLeftNode();

        // not a leaf, and two children
        var LeftOrRight = (Math.random() > 0.5);
        if (LeftOrRight)
            this.DeleteandReplaceWithRightNode();
        else
            this.DeleteandReplaceWithLeftNode();

        // should never get here.
        return false;
    };

    // Delete the node and replace with right child
    Node.prototype.DeleteandReplaceWithRightNode = function () {
        this.Value = this.RNode.Min();
        return this.RNode.Delete(this.Value);
    }

    // Delete the node and replace with left child
    Node.prototype.DeleteandReplaceWithLeftNode = function () {
        this.Value = this.LNode.Max();
        return this.LNode.Delete(this.Value);
    }

    // Get the height of this node
    Node.prototype.Height = function () {
        var h = 1;
        var temp = this;
        while (temp.Parent != null) {
            h++;
            temp = temp.Parent;
        }
        return h;
    }

    //=============================================================		
    // Button Events
    //=============================================================		

    // Degenerate Button clicked
    self.$DeGenerateBtn.click(function () {
        self.Keys.DegnerateMany();
        self.Canvas.Empty();
        self.Keys.OutputDepth();
        self.Keys.Root.DrawPreOrder();
        self.$GraphTabBtn.tab('show');
    });

    // Generate button clicked
    self.$GenerateBtn.click(function () {
        self.Keys.Init();
        self.Canvas.Empty();
        self.Keys.OutputDepth();
        self.Keys.Root.DrawPreOrder();
        self.$GraphTabBtn.tab('show');
    });

    // Graph Tab clicked
    self.$GraphTabBtn.click(function () {
        self.Canvas.Empty();
        self.Keys.Root.DrawPreOrder();
    });

    // Keys tab clicked
    self.$KeysTabBtn.click(function () {
        self.Keys.OutputKeys();
    });


    return self;
} // END Init

tba = Object();
// On document read
$(document).ready(function () {
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    })
    $('.btn-group').button();
    tba.binary = new tbaBinaryTree();
});
