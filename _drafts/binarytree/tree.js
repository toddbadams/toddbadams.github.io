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

// A standard jQuery plugin, http://docs.jquery.com/Plugins/Authoring
(function ($) {

    var methods = {
        init: function () {
            // store this object
            var self = this;

            // merge data attributes with defaults   
            self.settings = $.extend({
				'MaxTreeHeight': 20,
				'LineWidth': 1,
				'Color': 'black',
				'NodeRadius': 1,
				'GenerateButtonId': 'generate-button',
				'DeGenerateButtonId': 'degenerate-button',
				'CanvasFill': 'white',
				'MinDataValue' : 0,
				'MaxDataValue' : 1000,
				'TopBarHeight' : 50,
				'DrawDelay' : 100        
            }, {
                'MaxTreeHeight': self.attr("data-MaxTreeHeight"),
                'LineWidth': self.attr("data-LineWidth"),
                'Color': self.attr("data-Color"),
                'NodeRadius': self.attr("data-NodeRadius"),
                'GenerateButtonId': self.attr("data-GenerateButtonId"),
                'DeGenerateButtonId': self.attr("data-DeGenerateButtonId"),
                'CanvasFill': self.attr("data-CanvasFill"),
                'MinDataValue': self.attr("data-MinDataValue"),
                'MaxDataValue': self.attr("data-MaxDataValue"),
                'TopBarHeight': self.attr("data-TopBarHeight"),
                'DrawDelay': self.attr("data-DrawDelay")         
            });
			
		//=============================================================		
		// Node class
		function Node( parent, value ) {
			this.Parent = parent;		
			this.Value = value;
			this.RNode = null;
			this.LNode = null;
			
			if (this.Parent == null ) {
				this.XGridSize = Tree.XGridSize;
				this.Height = 1;
				this.Y = self.settings.TopBarHeight;
				this.X = self.Canvas.Width/2;
			} else {
				this.XGridSize = 0.5* this.Parent.XGridSize;
				this.Height = this.Parent.Height+1;
				this.Y = this.Parent.Y + Tree.YGridSize;
				if (value > this.Parent.Value) {
					this.X = this.Parent.X + this.XGridSize;
				} else {
					this.X = this.Parent.X - this.XGridSize;
				}
			}
		};
		
		// Preorder Draw (Visit, Left, Right)
		Node.prototype.DrawPreOrder = function() {
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
		Node.prototype.DrawNode = function() {
			self.Canvas.Context.arc(this.X, this.Y, Tree.NodeRadius, 0 , 2 * Math.PI);
			self.Canvas.Context.fillStyle = Tree.Color;
			self.Canvas.Context.fill();
		};
		
		// Draw the edge to the right node
		Node.prototype.DrawEdge = function(node) {
			// need to move the x based on max height
			
			self.Canvas.Context.beginPath();
			self.Canvas.Context.moveTo(this.X, this.Y);
			self.Canvas.Context.lineTo(node.X, node.Y);	
			self.Canvas.Context.lineWidth = Tree.LineWidth;
			self.Canvas.Context.strokeStyle = Tree.Color;
			self.Canvas.Context.stroke();
		};
	
		// Insert a value into the tree node	
		Node.prototype.Insert = function(value) {
			if (value != this.Value) {
				if (value > this.Value) {
					if (this.RNode == null) {
						this.RNode = new Node(this, value);
						return this.RNode;
					} else {
						return this.RNode.Insert(value);
					}
				} else {
					if (this.LNode == null) {
						this.LNode = new Node(this, value);
						return this.LNode;
					} else {
						return this.LNode.Insert(value);
					}
				}	
			}
			return null;
		};	
			
	    // Get the maximuim value in this node tree
		Node.prototype.Max = function() {
			if (this.RNode==null) {
				return this.Value;
			} else {
				return this.RNode.Max();
			}		
		};
					
	    // Get the minimum value in this node tree
		Node.prototype.Min = function() {
			if (this.LNode==null) {
				return this.Value;
			} else {
				return this.LNode.Max();
			}		
		};
		
		// Delete a value from the tree node	
		Node.prototype.Delete = function(value) {
			if (value != this.Value) {
				if (value > this.Value){
				 	if( this.RNode != null) this.RNode.Delete(value);
				} else {
					if (this.LNode != null) this.LNode.Delete(value);
				}	
			} else {
				// remove this node
				if ( Math.random() > 0.5 ) {
					// get next hightest value to swap
					if (this.RNode == null) {
						// this is a leaf, just delete it
						if (this.Value > this.Parent.Value) {
							// set parent right to null
							this.Parent.RNode = null;
							delete this;
						} else {
							// set parent left to null
							this.Parent.RNode = null;
							delete this;
						}
					} else { // not a leaf
						// get the min value on the right and set this value to it
						this.Value = this.RNode.Min();
						this.RNode.Delete(this.Value);
					}
					
				} else {
					// get the next lowest value to swap
					if (this.LNode == null) {
						// this is a leaf, just delete it
						if (this.Value > this.Parent.Value) {
							// set parent right to null
							this.Parent.RNode = null;
							delete this;
						} else {
							// set parent left to null
							this.Parent.RNode = null;
							delete this;
						}
					} else { // not a leaf
						// get the max value on the left and set this value to it
						this.Value = this.LNode.Max();
						this.RNode.Delete(this.Value);
					}
				}
			}
		};	
		
		
		//=============================================================		

		// The canvas settings
		self.Canvas = Object();
		self.Canvas.DomElement = document.getElementById("canvas");
		self.Canvas.Width = $(document).width();
		self.Canvas.DomElement.width = self.Canvas.Width;
		self.Canvas.Height = $(document).height() -  self.settings.TopBarHeight;
		self.Canvas.DomElement.height = self.Canvas.Height;
		self.Canvas.Context = self.Canvas.DomElement.getContext('2d');
		
		// The binary tree settings
		var Tree = Object();
		Tree.MaxHeight = self.settings.MaxTreeHeight;
		Tree.XGridSize = self.Canvas.Width/2;
		Tree.YGridSize = self.Canvas.Height/Tree.MaxHeight;
		Tree.LineWidth = self.settings.LineWidth;
		Tree.Color = self.settings.Color;
		Tree.NodeRadius = self.settings.NodeRadius;	
	
		// Generates a random value
		self.RandomValue = function() {
			return Math.floor((Math.random()*self.settings.MaxDataValue)+self.settings.MinDataValue);
		};
		
		// Degenerate Button clicked
		$("#"+self.settings.DeGenerateButtonId).click(function() {
			// Empty the canvas		
			self.Canvas.Context.fillStyle = self.settings.CanvasFill;
			self.Canvas.Context.fillRect(0, 0, self.Canvas.Width, self.Canvas.Height);
			
			// randomaly add/remove 10 items
			for (var i=0; i<10; i++)
			{
				self.Root.Insert(self.RandomValue());
				self.Root.Delete(self.RandomValue());
			}		
						
			// Draw the tree
			self.Root.DrawPreOrder();
		});
		
		// Generate button clicked
		$("#"+self.settings.GenerateButtonId).click(function () {
			// Empty the canvas		
			self.Canvas.Context.fillStyle = self.settings.CanvasFill;
			self.Canvas.Context.fillRect(0, 0, self.Canvas.Width, self.Canvas.Height);
			
			// The Tree Root
			self.Root = new Node(null, self.RandomValue());
			self.maxHeight = 1;
			
			// add the data
			while (self.maxHeight < Tree.MaxHeight)
			{
				var tempNode = self.Root.Insert(self.RandomValue());	
				if (tempNode != null && tempNode.Height > self.maxHeight) {
					self.maxHeight = tempNode.Height;
				}
			}
			
			// Draw the tree
			self.Root.DrawPreOrder();
		});
		return self;
        } // END Init
    };

    $.fn.tbaBinaryTree = function (method) {
        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.tbaBinaryTree');
        }
    };
})(jQuery);
tbaBinary = Object();
// On document read
$(document).ready(function () {
    /* find all tbaSlideshow */
   tbaBinary.Tree =  $('#canvas').tbaBinaryTree();
});
