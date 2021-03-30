/* creates and displays components */

/* 
package de.tud.gis.teachlets.networkanalysis.locatallocation;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Cursor;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Vector;

import javax.swing.BorderFactory;
import javax.swing.ImageIcon;
import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.JTextPane;
import javax.swing.SwingUtilities;
import javax.swing.UIManager;
import javax.swing.border.Border;
import javax.swing.text.BadLocationException;
import javax.swing.text.Style;
import javax.swing.text.StyleConstants;
import javax.swing.text.StyleContext;
import javax.swing.text.StyledDocument;
*/

/* public class NetworkAnalysisMain extends JApplet  */

function NETWORKANALYSISMAIN() {
	/*super();*/

	try {
		javax.swing.UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
		getContentPane().add(getMainPanel(), BorderLayout.CENTER);
		setData();

	} catch (e) {
		e.printStackTrace();
	}
}

/* initializes applet */
NETWORKANALYSISMAIN.prototype.init = function () {
	setSize(910, 665);
}

/* main function of application, creates frame */
NETWORKANALYSISMAIN.prototype.main = function (args) {
	SwingUtilities.invokeLater(new Runnable(), {
		run() {
			this.inst = new NetworkAnalysisMain();
			this.frame = new JFrame();
			this.frame.getContentPane().add(this.inst);
			(this.frame.getContentPane()).setPreferredSize(this.inst.getSize());
			this.frame.setTitle(" Netzwerkanalyse ");
			this.frame.setSize(916, 690);
			this.frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
			this.frame.setVisible(true);
		}
	});
};

/* sets initial data like points and adds them to metric */
NETWORKANALYSISMAIN.prototype.setData = function () {
	//create general nodes valid for all algorithms
	this.n1 = new NODE(400 - (DIAMETER / 2), 200 - (DIAMETER / 2), this.dataModel.getDiameter(), "Berlin");
	this.n2 = new NODE(420 - (DIAMETER / 2), 320 - (DIAMETER / 2), this.dataModel.getDiameter(), "Dresden");
	this.n3 = new NODE(280 - (DIAMETER / 2), 340 - (DIAMETER / 2), this.dataModel.getDiameter(), "Erfurt");
	this.n4 = new NODE(180 - (DIAMETER / 2), 520 - (DIAMETER / 2), this.dataModel.getDiameter(), "Stuttgart");
	this.n5 = new NODE(60 - (DIAMETER / 2), 340 - (DIAMETER / 2), this.dataModel.getDiameter(), "Koeln");
	this.n6 = new NODE(220 - (DIAMETER / 2), 120 - (DIAMETER / 2), this.dataModel.getDiameter(), "Hamburg");
	this.n7 = new NODE(320 - (DIAMETER / 2), 580 - (DIAMETER / 2), this.dataModel.getDiameter(), "Muenchen");
	this.n8 = new NODE(60 - (DIAMETER / 2), 480 - (DIAMETER / 2), this.dataModel.getDiameter(), "Saarbruecken");
	this.n9 = new NODE(290 - (DIAMETER / 2), 465 - (DIAMETER / 2), this.dataModel.getDiameter(), "Nuernberg");
	this.n10 = new NODE(110 - (DIAMETER / 2), 590 - (DIAMETER / 2), this.dataModel.getDiameter(), "Freiburg");
	this.n11 = new NODE(350 - (DIAMETER / 2), 300 - (DIAMETER / 2), this.dataModel.getDiameter(), "Leipzig");
	this.n12 = new NODE(90 - (DIAMETER / 2), 295 - (DIAMETER / 2), this.dataModel.getDiameter(), "Dortmund");
	this.n13 = new NODE(310 - (DIAMETER / 2), 340 - (DIAMETER / 2), this.dataModel.getDiameter(), "Jena");
	this.n14 = new NODE(220 - (DIAMETER / 2), 440 - (DIAMETER / 2), this.dataModel.getDiameter(), "Wuerzburg");
	this.n15 = new NODE(155 - (DIAMETER / 2), 415 - (DIAMETER / 2), this.dataModel.getDiameter(), "Frankfurt");
	this.n16 = new NODE(50 - (DIAMETER / 2), 317 - (DIAMETER / 2), this.dataModel.getDiameter(), "Duesseldorf");
	this.n17 = new NODE(160 - (DIAMETER / 2), 160 - (DIAMETER / 2), this.dataModel.getDiameter(), "Bremen");
	this.n18 = new NODE(200 - (DIAMETER / 2), 220 - (DIAMETER / 2), this.dataModel.getDiameter(), "Hannover");
	this.n19 = new NODE(310 - (DIAMETER / 2), 235 - (DIAMETER / 2), this.dataModel.getDiameter(), "Magdeburg");
	this.n20 = new NODE(290 - (DIAMETER / 2), 110 - (DIAMETER / 2), this.dataModel.getDiameter(), "Schwerin");
	this.n21 = new NODE(230 - (DIAMETER / 2), 50 - (DIAMETER / 2), this.dataModel.getDiameter(), "Kiel");
	this.n22 = new NODE(325 - (DIAMETER / 2), 65 - (DIAMETER / 2), this.dataModel.getDiameter(), "Rostock");
	this.n23 = new NODE(200 - (DIAMETER / 2), 310 - (DIAMETER / 2), this.dataModel.getDiameter(), "Kassel");
	this.n24 = new NODE(125 - (DIAMETER / 2), 230 - (DIAMETER / 2), this.dataModel.getDiameter(), "Osnabrueck");

	//add nodes and edges for shortest path algorithm
	add(this.n1); add(this.n2); add(this.n3); add(this.n4); add(this.n5); add(this.n6); add(this.n7); add(this.n8);
	add(this.n9); add(this.n10); add(this.n11); add(this.n12); add(this.n13); add(this.n14); add(this.n15);
	add(this.n16); add(this.n17); add(this.n18); add(this.n19); add(this.n20); add(this.n21); add(this.n22);
	add(this.n23); add(this.n24);
}

/* creates components and adds them to panel */
NETWORKANALYSISMAIN.prototype.getMainPanel = function () {
	this.taInstrucLocat = new JTextArea();
	this.btnAlgoLocat = new JButton();

	//create model
	this.dataModel = new DataModel(DIAMETER);
	//create & add viewer
	this.viewer = new JPaintPanel(this.dataModel);

	//create textpane
	this.textPane = createTextPane();
	this.textPane.setEditable(false);

	this.pnlMain = new JPanel();
	this.pnlMain.setLayout(null);
	this.viewer.setPreferredSize(new Dimension(493, 653));
	this.viewer.setLayout(null);
	this.viewer.setBounds(410, 5, this.viewer.getPreferredSize().width + 1, this.viewer.getPreferredSize().height + 1);
	this.viewer.addMouseMotionListener(new MyMouseAdapter(this.viewer, this.dataModel));
	this.viewer.addMouseListener(new MyMouseAdapter(this.viewer, this.dataModel));

	this.textPane.setBounds(5, 5, 400, 655);

	//draw border of textpane
	this.bord = BorderFactory.createLineBorder(Color.black);
	this.textPane.setBorder(this.bord);

	this.taInstrucLocat.setEditable(false);

	this.pnlMain.add(this.textPane);
	this.pnlMain.add(this.viewer);

	return this.pnlMain;
}

/* returns data model */
NETWORKANALYSISMAIN.prototype.getDataModel = function () {
	return this.dataModel; 
}

/*  add Node to data model */
NETWORKANALYSISMAIN.prototype.add = function (n) {
	this.dataModel.add(n);
}

/* add Edge to data model */
NETWORKANALYSISMAIN.prototype.add = function (e) {
	this.dataModel.add(e);
}

/* creates text pane with declarations and images of metrics */
NETWORKANALYSISMAIN.prototype.createTextPane = function () {
	this.textPane = new JTextPane();
	this.doc = this.textPane.getStyledDocument();
	addStylesToDocument(this.doc);

	//add elements to styled document according to algorithm
	try {
		this.doc.insertString(this.doc.getLength(), "Standortplanung:", this.doc.getStyle("heading"));
		this.doc.insertString(this.doc.getLength(), this.dataModel.getAlgorithm().getDescription(), this.doc.getStyle("regular"));
		this.doc.insertString(this.doc.getLength(), " ", this.doc.getStyle("buttonStartLocat"));
		this.doc.insertString(this.doc.getLength(), "\n\n", this.doc.getStyle("regular"));
		this.doc.insertString(this.doc.getLength(), " ", this.doc.getStyle("lblInstrucLocat"));
		this.doc.insertString(this.doc.getLength(), "\n\n", this.doc.getStyle("regular"));
		this.doc.insertString(this.doc.getLength(), " ", this.doc.getStyle("buttonAlgoLocat"));
	} catch (e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}

	return this.textPane;
}

/* defines all available styles and elements for the text pane */
NETWORKANALYSISMAIN.prototype.addStylesToDocument = function(doc){
	//initialize some styles
	this.def = StyleContext.getDefaultStyleContext().getStyle(StyleContext.DEFAULT_STYLE);

	//parent style
	this.regular = this.doc.addStyle("regular", this.def);
	StyleConstants.setFontFamily(this.def, "SansSerif");
	StyleConstants.setFontSize(this.def, 12);

	//children styles
	this.s = this.doc.addStyle("heading", this.regular);
	StyleConstants.setBold(this.s, true);
	StyleConstants.setUnderline(this.s, true);

	this.s = this.doc.addStyle("italic", this.regular);
	StyleConstants.setItalic(this.s, true);

	this.s = this.doc.addStyle("bold", this.regular);
	StyleConstants.setBold(this.s, true);

	//add buttons
	this.s = this.doc.addStyle("buttonStartLocat", this.regular);
	StyleConstants.setAlignment(this.s, StyleConstants.ALIGN_CENTER);

	btnStartLocat = new JButton();
	btnStartLocat.setText("Start");
	btnStartLocat.setCursor(Cursor.getDefaultCursor());
	btnStartLocat.setActionCommand(buttonString);

	//change button text and status with button click
	btnStartLocat.addActionListener(new ActionListener(), {
		actionPerformed(e) {
			this.dataModel.setActualPhase(DataModel.AlgorPhase.SETENDNODE);
			this.dataModel.clearResultLists();
			this.dataModel.clearNodeListStartEnd();
			this.dataModel.getNodeListAlgo().clear();
			this.viewer.setActualInstructionTextArea(taInstrucLocat);
			this.viewer.setActualContinueButton(btnAlgoLocat);
			taInstrucLocat.setText(_dataModel.getAlgorithm().getInstructionText(_dataModel.getActualPhase()));

			//andere Label auf leer setzen
			btnAlgoLocat.setVisible(true);
			btnAlgoLocat.setEnabled(false);
			this.viewer.repaint();
		} 
	});

	StyleConstants.setComponent(this.s, btnStartLocat);

	this.s = this.doc.addStyle("buttonAlgoLocat", this.regular);
	StyleConstants.setAlignment(this.s, StyleConstants.ALIGN_CENTER);
	btnAlgoLocat.setText("Algorithmus starten");
	btnAlgoLocat.setCursor(Cursor.getDefaultCursor());
	btnAlgoLocat.setActionCommand(buttonString);
	btnAlgoLocat.setVisible(false);

	//execute algorithm with button click
	btnAlgoLocat.addActionListener(new ActionListener(), {
		actionPerformed(e) {
			if(this.dataModel.getEndNodes().size() > 0)
			this.dataModel.setActualPhase(DataModel.AlgorPhase.SHOWRESULT);
			result = this.dataModel.getAlgorithm().calculateAlgo(this.dataModel);
			this.dataModel.setNodeResultList(result);
			this.viewer.repaint();
		} 
	});

	StyleConstants.setComponent(this.s, btnAlgoLocat);

	//add Label	        
	this.s = this.doc.addStyle("lblInstrucLocat", this.regular);
	StyleConstants.setAlignment(this.s, StyleConstants.ALIGN_CENTER);

	taInstrucLocat.setFont(new Font("SansSerif", Font.BOLD, 12));

	StyleConstants.setComponent(this.s, taInstrucLocat);	
}

/* Returns an ImageIcon, or null if the path was invalid. */
NETWORKANALYSISMAIN.prototype.createImageIcon = function (path, description) {
	this.imgURL = NetworkAnalysisMain.class.getResource(path);
	if (this.imgURL != null) {
		return new ImageIcon(this.imgURL, description);
	} else {
		System.err.println("Couldn't find file: " + path);
		return null;
	}
}